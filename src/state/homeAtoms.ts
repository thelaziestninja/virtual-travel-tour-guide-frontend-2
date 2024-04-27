import { atom } from "jotai";
import { Destination } from "../types";

//HomePage
export const selectedDestinationAtom = atom<Destination | null>(null);
export const selectedCountryAtom = atom<string | null>(null);
export const destinationFormVisibleAtom = atom<boolean>(false);
