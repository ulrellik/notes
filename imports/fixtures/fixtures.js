import faker from 'faker';
import { Factory } from 'meteor/dburles:factory';

import Notes from '../api/notes';

Factory.define('notes', Notes, {
  title: () => faker.lorem.sentence(),
  body: () => faker.lorem.paragraphs(),
  userId: () => faker.random.alphaNumeric(10),
  updatedAt: () => faker.date.recent().getTime(),
});

export const notes = [];

notes.push(Factory.build('notes', {title: '', updatedAt: 1535483794801}));

for (let i = 0; i < 10; i++) {
  notes.push(Factory.build('notes'));
}
