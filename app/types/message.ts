export interface MessageResult {
  message: string;
}

export interface MessagePrompts {
  message: string;
  data?: MessageResult[];
}

export const prompts: MessageResult[] = [
  { message: "Hello there" },
  {
    message: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque nihil sunt
  dolore recusandae voluptatem tempora nobis temporibus iure at. Natus
  aliquam sed illo, velit neque quod sapiente voluptas similique
  exercitationem.
  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque nihil sunt
  dolore recusandae voluptatem tempora nobis temporibus iure at. Natus
  aliquam sed illo, velit neque quod sapiente voluptas similique
  exercitationem.
  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque nihil sunt
  dolore recusandae voluptatem tempora nobis temporibus iure at. Natus
  aliquam sed illo, velit neque quod sapiente voluptas similique
  exercitationem.
  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque nihil sunt
  dolore recusandae voluptatem tempora nobis temporibus iure at. Natus
  aliquam sed illo, velit neque quod sapiente voluptas similique
  exercitationem.
  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque nihil sunt
  dolore recusandae voluptatem tempora nobis temporibus iure at. Natus
  aliquam sed illo, velit neque quod sapiente voluptas similique
  exercitationem.`,
  },
  { message: "What can I assist you with?" },
  { message: "Welcome back!" },
  { message: "Is there anything I can help you find?" },
  { message: "Have a great day!" },
  { message: "Nice to see you again!" },
  { message: "Do you have any questions?" },
  { message: "Feel free to ask for help anytime!" },
  { message: "Thank you for reaching out!" },
];
