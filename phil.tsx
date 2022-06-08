import React, { useState, useContext, ReactNode, useReducer } from "react";

// =======TYPES=========

export interface ClassSetupContextInterface {
	topLevelStep?: "0" | "1" | "2" | "3" | null;
	currentCardStep?: CurrentCardStep;
	classSettings?: ClassSettings;
}

export interface ClassSettings {
	studentType?: StudentType | null;
	gradeLevel?: GradeLevel | null;
	subjectType?: SubjectType | null;
	googleRegistration?: boolean;
	microsoftRegistration?: boolean;
	namePasswordRegistration?: boolean;
	prePostAssessment?: boolean;
	retentionAssessment?: boolean;
	contests?: boolean;
	assignmentLock?: boolean;
	retakes?: boolean;
	oneToManyLessonMode?: boolean;
	videoType?: "VIMEO" | "YOUTUBE" | "WISTIA" | null;
	saveAsDefault?: boolean;
}

type ClassSetupContextActionType =
	| "UPDATE_TOP_LEVEL_STEP"
	| "UPDATE_CURRENT_CARD_STEP"
	| "UPDATE_CLASS_SETTINGS"
	| "TOGGLE_GOOGLE_REGISTRATION"
	| "TOGGLE_MICROSOFT_REGISTRATION"
	| "TOGGLE_NAME_PASSWORD_REGISTRATION"
	| "TOGGLE_PRE_POST_ASSESSMENT"
	| "TOGGLE_RETENTION_ASSESSMENT"
	| "TOGGLE_CONTESTS"
	| "TOGGLE_ASSIGNMENT_LOCK"
	| "TOGGLE_RETAKES"
	| "TOGGLE_ONE_TO_MANY_LESSON_MODE"
	| "UPDATE_ENTIRE_STATE";

export type CurrentCardStep =
	| null
	| "HERO"
	| "CLASS_SETTINGS"
	| "REGISTRATION_METHODS"
	| "CLASS_FEATURES"
	| "ASSIGNMENT_DEFAULTS"
	| "TEST_VIDEO"
	| "ALL_SET";

export interface ClassSetupContextAction {
	type: ClassSetupContextActionType;
	payload: ClassSetupContextInterface;
}

const STUDENT_TYPES = [`MIDDLE`, `HIGH`, `POST_SECONDARY`] as const;

type StudentType = typeof STUDENT_TYPES[number];

export const isStudentType = (value: string): value is StudentType => {
	return STUDENT_TYPES.includes(value as StudentType);
};

export const studentTypeMap: {
	[key in StudentType]: string;
} = {
	MIDDLE: `Middle School`,
	HIGH: `High School`,
	POST_SECONDARY: `Post Secondary`,
};

const GRADE_LEVELS = [
	`GRADE_5`,
	`GRADE_6`,
	`GRADE_7`,
	`GRADE_8`,
	`GRADE_9`,
	`GRADE_10`,
	`GRADE_11`,
	`GRADE_12`,
	`COLLEGE_FRESHMEN`,
	`COLLEGE_SOPHOMORE`,
	`COLLEGE_JUNIOR`,
	`COLLEGE_SENIOR`,
	`COLLEGE_FIFTH_YEAR`,
	`GRADUATE`,
] as const;

type GradeLevel = typeof GRADE_LEVELS[number];

export const isGradeLevel = (value: string): value is GradeLevel => {
	return GRADE_LEVELS.includes(value as GradeLevel);
};

export const gradeLevelMap: {
	[key in GradeLevel]: string;
} = {
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

const SUBJECT_TYPES = [`JOURNALISM`, `MEDIA_BIAS`, `OTHER`] as const;
type SubjectType = typeof SUBJECT_TYPES[number];
export const isSubjectType = (value: string): value is SubjectType => {
	return SUBJECT_TYPES.includes(value as SubjectType);
};

export const subjectTypeMap: {
	[key in SubjectType]: string;
} = {
	JOURNALISM: `Journalism`,
	MEDIA_BIAS: `Media Bias`,
	OTHER: `Other`,
};

// ===REDUCER FUNCTION====

const reducer = (
	state: ClassSetupContextInterface,
	action: ClassSetupContextAction
): ClassSetupContextInterface => {
	switch (action.type) {
		case `UPDATE_TOP_LEVEL_STEP`:
			return action.payload.topLevelStep
				? { ...state, topLevelStep: action.payload.topLevelStep }
				: state;
		case `UPDATE_CURRENT_CARD_STEP`:
			return action.payload.currentCardStep
				? { ...state, currentCardStep: action.payload.currentCardStep }
				: state;
		case `UPDATE_CLASS_SETTINGS`:
			return action.payload.classSettings
				? { ...state, classSettings: { ...state.classSettings, ...action.payload.classSettings } }
				: state;
		case `TOGGLE_GOOGLE_REGISTRATION`:
			return {
				...state,
				classSettings: {
					...state.classSettings,
					googleRegistration: !state.classSettings?.googleRegistration,
				},
			};
		case `TOGGLE_MICROSOFT_REGISTRATION`:
			return {
				...state,
				classSettings: {
					...state.classSettings,
					microsoftRegistration: !state.classSettings?.microsoftRegistration,
				},
			};
		case `TOGGLE_NAME_PASSWORD_REGISTRATION`:
			return {
				...state,
				classSettings: {
					...state.classSettings,
					namePasswordRegistration: !state.classSettings?.namePasswordRegistration,
				},
			};
		case `TOGGLE_PRE_POST_ASSESSMENT`:
			return {
				...state,
				classSettings: {
					...state.classSettings,
					prePostAssessment: !state.classSettings?.prePostAssessment,
				},
			};
		case `TOGGLE_RETENTION_ASSESSMENT`:
			return {
				...state,
				classSettings: {
					...state.classSettings,
					retentionAssessment: !state.classSettings?.retentionAssessment,
				},
			};
		case `TOGGLE_CONTESTS`:
			return {
				...state,
				classSettings: {
					...state.classSettings,
					contests: !state.classSettings?.contests,
				},
			};
		case `TOGGLE_ASSIGNMENT_LOCK`:
			return {
				...state,
				classSettings: {
					...state.classSettings,
					assignmentLock: !state.classSettings?.assignmentLock,
				},
			};
		case `TOGGLE_RETAKES`:
			return {
				...state,
				classSettings: {
					...state.classSettings,
					retakes: !state.classSettings?.retakes,
				},
			};
		case `TOGGLE_ONE_TO_MANY_LESSON_MODE`:
			return {
				...state,
				classSettings: {
					...state.classSettings,
					oneToManyLessonMode: !state.classSettings?.oneToManyLessonMode,
				},
			};
		case `UPDATE_ENTIRE_STATE`:
			return { ...state, ...action.payload };
		default:
			return state;
	}
};

const ClassSetupStepContext = React.createContext<ClassSetupContextInterface | null>(null);
const ClassSetupStepUpdateContext = React.createContext<React.Dispatch<ClassSetupContextAction>>(
	() => {}
);

// functions for accessing the respective contexts
export function useClassSetupStepContext(): ClassSetupContextInterface | null {
	return useContext(ClassSetupStepContext);
}

export function useClassSetupStepUpdateContext(): React.Dispatch<ClassSetupContextAction> {
	return useContext(ClassSetupStepUpdateContext);
}

const ClassSetupContextProvider = ({ children }: { children: ReactNode }) => {
	const initialState: ClassSetupContextInterface = {
		topLevelStep: `0`,
		currentCardStep: `HERO`,
		classSettings: {
			studentType: null,
			gradeLevel: null,
			subjectType: null,
			googleRegistration: true,
			microsoftRegistration: true,
			namePasswordRegistration: true,
			prePostAssessment: true,
			retentionAssessment: true,
			contests: true,
			assignmentLock: true,
			retakes: true,
			oneToManyLessonMode: true,
			videoType: null,
			saveAsDefault: false,
		},
	};

	const [classSetupContext, dispatchClassSetupContext] = useReducer(reducer, initialState);

	return (
		<ClassSetupStepContext.Provider value={classSetupContext}>
			<ClassSetupStepUpdateContext.Provider value={dispatchClassSetupContext}>
				{children}
			</ClassSetupStepUpdateContext.Provider>
		</ClassSetupStepContext.Provider>
	);
};

export default ClassSetupContextProvider;
