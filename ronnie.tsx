import React from "react";
import create from "zustand";
/**
 * Stores information for educator class setup.
 *
 * @param props
 * @returns global state
 */

// ========== STUDENT TYPE ==========
export const studentTypeMap = {
	MIDDLE: `Middle School`,
	HIGH: `High School`,
	SECONDARY: `Post Secondary`,
};

export type StudentType = keyof typeof studentTypeMap;

// ========== GRADE LEVEL ==========
export const gradeMap = {
	GRADE_5: `Fifth Grade`,
	GRADE_6: `Sixth Grade`,
	GRADE_7: `Seventh Grade`,
	GRADE_8: `Eighth Grade`,
	GRADE_9: `Ninth Grade`,
	GRADE_10: `Tenth Grade`,
	GRADE_11: `Eleventh Grade`,
	GRADE_12: `Twelfth Grade`,
	COLLEGE_FRESHMEN: `College Freshmen`,
	COLLEGE_SOPHOMORE: `College Sophomore`,
	COLLEGE_JUNIOR: `College Junior`,
	COLLEGE_SENIOR: `College Senior`,
	COLLEGE_FIFTH_YEAR: `College 5+ Year`,
	GRADUATE: `Graduate`,
};

export type GradeLevel = keyof typeof gradeMap;

// ========== SUBJECT TYPE ==========
export const subjectMap = {
	CIVICS: `Civics`,
	GOVT: `Government`,
	HISTORY: `History`,
	SOCIALSCIENCE: `Other Social Science`,
	ENGLISH: `English/ELA`,
	JOURNALISM: `Journalism`,
	LIBRARY: `Library/Media Studies`,
	SCIENCE: `Science`,
	TECH: `Technology`,
	OTHER: `Other`,
};

export type Subject = keyof typeof subjectMap;

// ========== REGISTRATION METHODS ==========
export type RegistrationMethod = `MICROSOFT` | `GOOGLE` | `EMAIL`;

// ========== VIDEO ==========
export type VideoPreference = `YOUTUBE` | `VIMEO` | `WISTIA`;

interface SectionStore {
	title: string | null;
	studentType: StudentType | null;
	grade: GradeLevel | null;
	subject: Subject | null;
	registration: RegistrationMethod[];
	contests: boolean;
	prePost: boolean;
	retention: boolean;
	lessonLock: boolean;
	oneToMany: boolean;
	retake: boolean;
	video: VideoPreference | null;
	setTitle: (arg: string) => void;
	setStudentType: (arg: StudentType) => void;
	setGrade:  (arg: GradeLevel) => void;
	setSubject:  (arg: Subject) => void;
	setRegistration: (arg: RegistrationMethod[]) => void;
	setContests:  () => void;
	setPrePost:  () => void;
	setRetention:  () => void;
	setLessonLock: () => void;
	setOneToMany: () => void;
	setRetake: () => void;
	setVideo: (arg: VideoPreference) => void;
}

export const useClassStore = create<SectionStore>((set) => ({
	title: null,
	studentType: null,
	grade: null,
	subject: null,
	registration: [`MICROSOFT`, `GOOGLE`, `EMAIL`],
	contests: true,
	prePost: true,
	retention: true,
	lessonLock: true,
	oneToMany: false,
	retake: true,
	video: null,
	setTitle: (input: string) => set({ title: input }),
	setStudentType: (input: StudentType) => set ({ studentType: input }),
	setGrade: (input: GradeLevel) => set({ grade: input }),
	setSubject: (input: Subject) => set({ subject: input }),
	setRegistration: (input: RegistrationMethod[]) => set({ registration: input }),
	setContests: () => set((state) => ({ contests: !state.contests })),
	setPrePost: () => set((state) => ({ prePost: !state.prePost })),
	setRetention: () => set((state) => ({ retention: !state.retention })),
	setLessonLock: () => set((state) => ({ lessonLock: !state.lessonLock })),
	setOneToMany: () => set((state) => ({ oneToMany: !state.oneToMany })),
	setRetake: () => set((state) => ({ retake: !state.retake })),
	setVideo: (input: VideoPreference) => set({ video: input }),
}));

// ========== SETUP STEPS ==========
export type Step =
	| `HERO`
	| `CLASS`
	| `REGISTRATION`
	| `FEATURES`
	| `ASSIGNMENTS`
	| `VIDEO`
	| `CONFIRMATION`;

export const copyMap: {
	[key in Step]: string;
} = {
	HERO: `Settings determined during this stage can be accessed and changed at anytime. Happy with your settings after the first go? You'll be able to save these settings as your default for any additional classes created.`,
	CLASS: `Tell us about your class. What grade level do you teach? What subject will you focus on?`,
	REGISTRATION: `What methods of registration do you want your students to be able to utilize? Any of the options toggled on will be available to them. At least one registration method must be on.`,
	FEATURES: `What features would you like to add to your class? Any of the options toggled on will be available to them. `,
	ASSIGNMENTS: `Settings saved here will be applied to all of your courses by default. These settings can be changed at any point in time, on an assignment-by-assignment basis. `,
	VIDEO: `We deliver the videos in our lessons through Vimeo, YouTube, and/or Wistia. Many schools block one of these services, so ask your school's IT staff which one is preferred.`,
	CONFIRMATION: `Happy with these settings? You can set them as your default for any classes created in the future.`,
};

interface StepProps {
	current: keyof typeof copyMap;
	setCurrent: (arg: Step) => void;
}

export const useStepStore = create<StepProps>((set) => ({
	current: `HERO`,
	setCurrent: (input: Step) => set({ current: input }),
}));
