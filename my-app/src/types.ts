import React, { JSX } from "react";

export interface ButtonInterface {
  text: string;
  filled?: boolean;
type:string;
href: string;
icon?: JSX.Element;}

export interface cardInterface {
  title: string;
  description: string; // description is now always a list of strings
   description2: string;
  downloadLink: string;
  btn: ButtonInterface;
}
