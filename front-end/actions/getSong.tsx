"use client"
import { data } from 'autoprefixer'
import React, { useEffect, useState } from 'react'

const getSong = () => {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:8080/songs')
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};

export default getSong;