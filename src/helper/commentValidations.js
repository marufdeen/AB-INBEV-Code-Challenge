import { validName, validEmail } from './regEx';

export const validate = (body) => {
  const { visitorName, visitorEmail, content } = body;
  const commentErrors = [];

  if (!visitorName || !validName.test(visitorName)) {
    commentErrors.push({
      visitorName: 'Your name is required and must be at least three alphabetical characters.'
    });
  }
  if (!visitorEmail || !validEmail.test(visitorEmail)) {
    commentErrors.push({
      visitorEmail: 'Your email is required and must be in a valid E-mail Format.'
    });
  }
  if (!content) {
    commentErrors.push({
      content: 'Your comment is missing.'
    });
  }
  return commentErrors;
};

export default validate;
