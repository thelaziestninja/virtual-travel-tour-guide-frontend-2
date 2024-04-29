import { atom } from "jotai";
import { Feedback } from "../types";

// Atom to store the list of feedbacks
export const feedbacksAtom = atom<Feedback[]>([]);

// Atom for managing new feedback input
export const newFeedbackTextAtom = atom<string>("");

// Atom for managing the anonymity of the feedback submitter
export const isAnonymousAtom = atom<boolean>(false);

// Atom for managing the name of the feedback submitter
export const leftByAtom = atom<string>("");
