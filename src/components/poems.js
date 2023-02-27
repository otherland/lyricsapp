import React, { Component, useState, useEffect } from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  Link,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  IconButton,
  Select
} from "@chakra-ui/react";

import { 
  ArrowLeftIcon,
  ArrowRightIcon
 } from '@chakra-ui/icons'

import { AddIcon, StarIcon } from '@chakra-ui/icons'

const styles = {
  width: 550
};

import firebase from "firebase/app";
import { fireStore } from "../service/firebase";
const db = fireStore;


const PoemsList = () => {
  const [poems, setPoems] = useState([]);
  const [currentPoemIndex, setCurrentPoemIndex] = useState(0);
  const [selectedEmotion, setSelectedEmotion] = useState("All");
  
  const emotionOptions = [
    "All",
    ...new Set(poems.map((poem) => poem.emotion)),
  ];

  const filteredPoems =
    selectedEmotion === "All"
      ? poems
      : poems.filter((poem) => poem.emotion === selectedEmotion);

  useEffect(() => {
    const unsubscribe = db.collection('poems').orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => {
        const newPoems = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        // let shuffled = unshuffled
        //     .map(value => ({ value, sort: Math.random() }))
        //     .sort((a, b) => a.sort - b.sort)
        //     .map(({ value }) => value)
        setPoems(newPoems);
      });
    return () => unsubscribe();
  }, []);

  const handleNext = () => {
    setCurrentPoemIndex((index) => (index + 1) % filteredPoems.length);
  };

  const handlePrevious = () => {
    setCurrentPoemIndex((index) => (index - 1 + filteredPoems.length) % filteredPoems.length);
  };

  const handleSelectChange = (event) => {
    setSelectedEmotion(event.target.value);
    setCurrentPoemIndex(0);
  };

  const formatPoem = (content) => {
    const lookup = {a: 'deeppink', e: 'violet', i: 'cyan', o: 'chartreuse', u: 'yellow'}
    let colorizedContent = '';
    for (let i = 0; i < content.length; i++) {
      const char = content[i];
      const lowercaseChar = char.toLowerCase();

      if (lookup[lowercaseChar]) {
        colorizedContent += `<span style="color:${lookup[lowercaseChar]}">${char}</span>`;
      } else {
        colorizedContent += char;
      }
    }
    colorizedContent = colorizedContent.split('\\n').join('</br>')
    return (
      <div
        dangerouslySetInnerHTML={{__html: colorizedContent}}
      />
    );
  }
  
  const currentPoem = filteredPoems[currentPoemIndex];

  if (currentPoem == undefined) return <div>No poems.</div>;

  return (
    <div>
        <Select value={selectedEmotion} onChange={handleSelectChange}
          mb={4}
        >
          {emotionOptions.map((option) => (
            <option key={option} value={option}>
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </option>
          ))}
        </Select>
        <div style={{textAlign: 'center'}}>
          <Box mx="auto"
            bg="gray.800"
            borderWidth="1px"
            borderColor="gray.700"
            borderRadius="lg"
            letterSpacing='wide'
            padding={14}
            mb={8}
            >
            <Text 
              fontSize="xl" 
              color="gray.200"
              fontFamily="monaco,Consolas,Lucida Console,monospace" 
              mb={8}
              >{formatPoem(currentPoem.content)}</Text>
            <Text as='i' fontSize="sm" textAlign="right">
              {currentPoem.emotion} @ {currentPoem.timestamp.toDate().toLocaleDateString()}
            </Text>
          </Box>
        </div>
        <Box display="flex" justifyContent="space-between">
          <IconButton
            aria-label="Previous poem"
            icon={<ArrowLeftIcon />}
            onClick={handlePrevious}
            disabled={currentPoemIndex === 0}
          />
          <IconButton
            aria-label="Next poem"
            icon={<ArrowRightIcon />}
            onClick={handleNext}
            disabled={currentPoemIndex === filteredPoems.length - 1}
          />
        </Box>
    </div>
  );
};
export default PoemsList;
