import * as Yup from 'yup';

export const validateUrl = async (url: string) => {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    if (!response.ok) {
      return new Yup.ValidationError('The URL is not publicly accessible.', null, 'imageUrl');
    }
    return true;
  } catch {
    return new Yup.ValidationError('The URL is not valid or accessible.', null, 'imageUrl');
  }
};
