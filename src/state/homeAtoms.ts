import { atom } from "jotai";
import { Destination } from "../types";

export const selectedDestinationAtom = atom<Destination | null>(null);
export const selectedCountryAtom = atom<string | null>(null);
export const destinationFormVisibleAtom = atom<boolean>(false);

//Loggin when the atom is set
// selectedDestinationAtom.onSet((newState) => {
//     console.log('Selected Destination Updated:', newState);
//   });
