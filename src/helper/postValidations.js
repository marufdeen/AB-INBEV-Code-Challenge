export const validate = (body) => {
  const { title, content } = body;
  const postErrors = [];
  if (!title || title.length < 3 || title.length > 50) {
    postErrors.push({
      title: 'Post Title is required and should at least between 3 - 50 characters'
    });
  }
  if (!content) {
    postErrors.push({
      content: 'Please, write something. Your content is missing'
    });
  }
  return postErrors;
};

export default validate;
