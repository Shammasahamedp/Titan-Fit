import * as yup from 'yup';

export const trainerRejectionEmailSchema = yup.object().shape({
  reason: yup
    .string()
    .required('email message is required')
    .test('min-words', 'message must be at least 5 words', (value) => {
      if (!value) return false;
      const wordCount = value.trim().split(/\s+/).length;
      return wordCount >= 5;
    }),
});
