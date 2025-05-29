import { JSX } from "react";

export interface ButtonInterface {
  text: string;
  filled?: boolean;
type:string;
href: string;
icon?: JSX.Element;}

export interface cardInterface {
  title: string;
  description: string;
  downloadLink: string;
  btn: ButtonInterface;
}
