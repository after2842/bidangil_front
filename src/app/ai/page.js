"use client";

import { motion } from "motion/react";
import React from "react";
import { useState } from "react";
import { AuroraBackground } from "@/components/ui/aurora-background";
// import React, { useState } from 'react';
// import Card from './Card';
// import './Carousel.css'; // Optional CSS for styling
export default function AuroraBackgroundDemo() {
  return <Carousel></Carousel>;
}
const carouselItems = [
  {
    id: 1,
    title: "Card 1",
    description: "This is the first card.",
    image:
      "https://cdn.dribbble.com/userupload/10296202/file/original-9e593483d777e120e831be7af00f6afc.jpg?resize=1504x1128&vertical=center",
  },
  {
    id: 2,
    title: "Card 2",
    description: "This is the second card.",
    image:
      "https://cdn.dribbble.com/userupload/16033590/file/original-d2d77284d86ae42962a2e34c301a7fee.png?resize=1024x768&vertical=center",
  },
  {
    id: 3,
    title: "Card 3",
    description: "This is the third card.",
    image:
      "https://cdn.dribbble.com/userupload/16859717/file/original-aaa655af1b220feb261e20e79d14422d.png?resize=1024x768&vertical=center",
  },
];

const Carousel = () => {
  const [forms, setforms] = useState([{ url: "", desc: "" }]);

  const handlechange = (e, index) => {
    const { name, value } = e.target;
    const newform = [...forms];
    newform[index][name] = value;
    setforms(newform);
  };

  const handlesubmit = () => {
    e.preventDefault();
    console.log("Submitted Forms:", forms);
  };
  const handleadd = () => {
    const newform = [...forms, { url: "", desc: "" }];
    setforms(newform);
  };
  return (
    <div className="w-full max-w-lg mx-auto relative">
      {forms.map((form, index) => (
        <p>
          form.url= {index} {form.url}
        </p>
      ))}
      <form onSubmit={handlesubmit}>
        {forms.map((form, index) => (
          <div className="bg-pink-100 rounded">
            <input
              name="url"
              id={index}
              value={form.url}
              onChange={(e) => handlechange(e, index)}
            ></input>
            <input
              name="desc"
              id={index}
              value={form.desc}
              onChange={(e) => handlechange(e, index)}
              className="bg-blue-500 border"
            ></input>
          </div>
        ))}
        <button type="button" onClick={handleadd}>
          add
        </button>
        <button type="submit">submit</button>
      </form>
    </div>
  );
};
