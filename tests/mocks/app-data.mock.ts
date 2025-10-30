export const appData = {
  students: [
    {
      id: 'student1',
      firstName: 'Tony',
      lastName: 'Stark',
      yearLevel: 6,
    },
  ],
  questions: [
    {
      id: 'numeracy1',
      stem: 'What is the value of 2 + 3 x 5?',
      type: 'multiple-choice',
      strand: 'Number and Algebra',
      config: {
        options: [
          { id: 'option1', label: 'A', value: '10' },
          { id: 'option2', label: 'B', value: '15' },
          { id: 'option3', label: 'C', value: '17' },
          { id: 'option4', label: 'D', value: '25' },
        ],
        key: 'option3',
        hint: 'Work out the multiplication sign BEFORE the addition sign',
      },
    },
  ],
  assessments: [
    {
      id: 'assessment1',
      name: 'Numeracy',
      questions: [
        {
          questionId: 'numeracy1',
          position: 1,
        },
      ],
    },
  ],
  studentResponses: [
    {
      id: 'studentReponse1',
      assessmentId: 'assessment1',
      assigned: '14/12/2019 10:31:00',
      started: '16/12/2019 10:00:00',
      completed: '16/12/2019 10:46:00',
      student: {
        id: 'student1',
        yearLevel: 3,
      },
      responses: [
        {
          questionId: 'numeracy1',
          response: 'option3',
        },
        {
          questionId: 'numeracy2',
          response: 'option4',
        },
        {
          questionId: 'numeracy3',
          response: 'option2',
        },
        {
          questionId: 'numeracy4',
          response: 'option1',
        },
        {
          questionId: 'numeracy5',
          response: 'option1',
        },
        {
          questionId: 'numeracy6',
          response: 'option1',
        },
        {
          questionId: 'numeracy7',
          response: 'option4',
        },
        {
          questionId: 'numeracy8',
          response: 'option4',
        },
        {
          questionId: 'numeracy9',
          response: 'option1',
        },
        {
          questionId: 'numeracy10',
          response: 'option1',
        },
        {
          questionId: 'numeracy11',
          response: 'option1',
        },
        {
          questionId: 'numeracy12',
          response: 'option1',
        },
        {
          questionId: 'numeracy13',
          response: 'option3',
        },
        {
          questionId: 'numeracy14',
          response: 'option2',
        },
        {
          questionId: 'numeracy15',
          response: 'option1',
        },
        {
          questionId: 'numeracy16',
          response: 'option1',
        },
      ],
      results: {
        rawScore: 3,
      },
    },
  ],
};
