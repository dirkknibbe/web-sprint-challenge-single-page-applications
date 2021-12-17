import * as yup from 'yup';

const formSchema = yup.object().shape({
name: yup
    .string()
    .trim()
    .required('Name is required!')
    .min(2, 'name must be at least 2 characters'),
size: yup 
    .string()
    .trim(),

special: yup
    .string(),

pineapple: yup.boolean(),
beefsausage: yup.boolean(),
anchovies: yup.boolean(),
mushrooms: yup.boolean(),   
})

export default formSchema;