// =========================================
// KIS - LESSONS MODULE
// =========================================

const kisSubjects = [
  {
    id: "ap",
    name: "Araling Panlipunan",
    icon: "fa-solid fa-landmark",
    description: "History, geography, and society"
  },
  {
    id: "english",
    name: "English",
    icon: "fa-solid fa-language",
    description: "Reading, writing, and communication"
  },
  {
    id: "math",
    name: "Mathematics",
    icon: "fa-solid fa-calculator",
    description: "Numbers, equations, and problem solving"
  },
  {
    id: "science",
    name: "Science",
    icon: "fa-solid fa-flask",
    description: "Discover the world through science"
  },
  {
    id: "values",
    name: "Values Education",
    icon: "fa-solid fa-heart",
    description: "Character, values, and responsible living"
  },
  {
    id: "tle",
    name: "TLE",
    icon: "fa-solid fa-screwdriver-wrench",
    description: "Technology and livelihood education"
  },
  {
    id: "mapeh",
    name: "MAPEH",
    icon: "fa-solid fa-palette",
    description: "Music, arts, physical education, and health"
  },
  {
    id: "filipino",
    name: "Filipino",
    icon: "fa-solid fa-book-open",
    description: "Wika, panitikan, at komunikasyon"
  }
];
// =========================================
// KIS - LESSON DATABASE
// =========================================

const kisLessons = [

  // ARALING PANLIPUNAN
  {
    id: 1,
    subject: "ap",
    title: "Introduction to Philippine History",
    description: "Learn about the history and beginnings of the Philippines.",
    status: "Available"
  },
  {
    id: 2,
    subject: "ap",
    title: "Geography of the Philippines",
    description: "Explore the islands, regions, and geographical features.",
    status: "Available"
  },

  // ENGLISH
  {
    id: 3,
    subject: "english",
    title: "Parts of Speech",
    description: "Understand nouns, pronouns, verbs, and other parts of speech.",
    status: "Available"
  },
  {
    id: 4,
    subject: "english",
    title: "Reading Comprehension",
    description: "Develop your ability to understand written texts.",
    status: "Available"
  },

  // MATHEMATICS
  {
    id: 5,
    subject: "math",
    title: "Linear Equations",
    description: "Learn how to solve equations with one variable.",
    status: "Available"
  },
  {
    id: 6,
    subject: "math",
    title: "Quadratic Equations",
    description: "Explore equations involving squared variables.",
    status: "Available"
  },

  // SCIENCE
  {
    id: 7,
    subject: "science",
    title: "The Solar System",
    description: "Explore the Sun, planets, and other objects in our Solar System.",
    status: "Available"
  },
  {
    id: 8,
    subject: "science",
    title: "Cells and Their Functions",
    description: "Discover the structures of cells and how their organelles support life.",
    status: "Available"
  },

  // SCIENCE - LESSON 9
  {
    id: 17,
    subject: "science",
    title: "Force and Motion",
    description: "Explore forces, Newton's laws, speed, velocity, and acceleration.",
    status: "Available"
  },
  // VALUES EDUCATION
  {
    id: 9,
    subject: "values",
    title: "Respect and Responsibility",
    description: "Understand the importance of good character.",
    status: "Available"
  },
  {
    id: 10,
    subject: "values",
    title: "Making Responsible Decisions",
    description: "Learn how to make thoughtful decisions.",
    status: "Available"
  },

  // TLE
  {
    id: 11,
    subject: "tle",
    title: "Introduction to ICT",
    description: "Explore information and communication technology.",
    status: "Available"
  },
  {
    id: 12,
    subject: "tle",
    title: "Basic Computer Operations",
    description: "Learn fundamental computer operations.",
    status: "Available"
  },

  // MAPEH
  {
    id: 13,
    subject: "mapeh",
    title: "Elements of Music",
    description: "Explore rhythm, melody, harmony, and other elements.",
    status: "Available"
  },
  {
    id: 14,
    subject: "mapeh",
    title: "Physical Fitness",
    description: "Understand the components of physical fitness.",
    status: "Available"
  },

  // FILIPINO
  {
    id: 15,
    subject: "filipino",
    title: "Mga Bahagi ng Pananalita",
    description: "Pag-aralan ang iba't ibang bahagi ng pananalita.",
    status: "Available"
  },
  {
    id: 16,
    subject: "filipino",
    title: "Panitikang Pilipino",
    description: "Tuklasin ang panitikan at kultura ng Pilipinas.",
    status: "Available"
  }

];


// =========================================
// KIS - LESSON CONTENT
// =========================================

const kisLessonContent = {

  // =========================================
  // ENGLISH - PARTS OF SPEECH
  // =========================================

  3: {

    objectives: [
      "Define the eight parts of speech.",
      "Identify nouns, pronouns, verbs, and adjectives in sentences.",
      "Recognize adverbs, prepositions, conjunctions, and interjections.",
      "Use the parts of speech correctly in sentences."
    ],

    sections: [

      {
        heading: "1. What Are the Parts of Speech?",

        paragraphs: [
          "Parts of speech are categories of words based on their functions in a sentence.",
          "English has eight traditional parts of speech: nouns, pronouns, verbs, adjectives, adverbs, prepositions, conjunctions, and interjections.",
          "Understanding these categories helps us construct clear, meaningful, and grammatically correct sentences."
        ]
      },

      {
        heading: "2. Nouns and Pronouns",

        paragraphs: [
          "A noun names a person, place, thing, or idea. Examples include teacher, school, book, and honesty.",
          "A pronoun takes the place of a noun to avoid unnecessary repetition. Examples include he, she, it, they, and we.",
          "Example: Maria is a student. She studies every day. The pronoun 'She' replaces the noun 'Maria'."
        ]
      },

      {
        heading: "3. Verbs and Adjectives",

        paragraphs: [
          "A verb expresses an action, occurrence, or state of being. Examples include run, write, think, is, and are.",
          "An adjective describes or modifies a noun or pronoun. It may tell us what kind, which one, or how many.",
          "Example: The hardworking student writes a beautiful essay. 'Writes' is the verb, while 'hardworking' and 'beautiful' are adjectives."
        ]
      },

      {
        heading: "4. Adverbs and Prepositions",

        paragraphs: [
          "An adverb modifies a verb, adjective, or another adverb. It can describe how, when, where, or to what extent something happens.",
          "Examples of adverbs include quickly, yesterday, here, and very.",
          "A preposition shows the relationship of a noun or pronoun to another word in a sentence. Examples include in, on, under, beside, and between.",
          "Example: The children played happily in the park. 'Happily' is an adverb, while 'in' is a preposition."
        ]
      },

      {
        heading: "5. Conjunctions and Interjections",

        paragraphs: [
          "A conjunction connects words, phrases, or clauses. Common examples are and, but, or, because, and although.",
          "An interjection expresses a sudden emotion or reaction. Examples include Wow!, Oh!, Hurray!, and Ouch!",
          "Example: Hurray! Ana and Ben won the contest. 'Hurray!' is an interjection, and 'and' is a conjunction."
        ]
      },

      {
        heading: "6. Identifying Parts of Speech in Sentences",

        paragraphs: [
          "A word's part of speech depends on how it is used in a sentence. The same word may perform different grammatical functions in different sentences.",
          "For example, 'light' is a noun in 'Turn on the light' and an adjective in 'This bag is light'.",
          "Always examine the word's role in the sentence instead of identifying it by appearance alone."
        ],

        example: {
          problem: "Identify the parts of speech in: 'The clever girl reads quietly in the library.'",

          steps: [
            "'The' - Article or determiner",
            "'clever' - Adjective because it describes the girl",
            "'girl' - Noun because it names a person",
            "'reads' - Verb because it expresses an action",
            "'quietly' - Adverb because it describes how she reads",
            "'in' - Preposition because it shows a relationship",
            "'the' - Article or determiner",
            "'library' - Noun because it names a place"
          ],

          answer: "Adjective, noun, verb, adverb, preposition, and nouns are among the parts of speech used in the sentence.",

          explanation: "Each word performs a grammatical function. Identifying its role helps us understand how the sentence is constructed."
        }
      },

      {
        heading: "7. Key Points to Remember",

        paragraphs: [
          "Nouns name; pronouns replace nouns; verbs express actions or states; adjectives describe nouns; adverbs modify verbs, adjectives, or other adverbs.",
          "Prepositions show relationships; conjunctions connect words or groups of words; interjections express emotions.",
          "A word's grammatical function depends on its context in the sentence."
        ]
      }

    ]

  },

  // =========================================
  // ENGLISH - READING COMPREHENSION
  // =========================================

  4: {

    objectives: [
      "Explain the meaning and importance of reading comprehension.",
      "Identify the main idea and supporting details.",
      "Use context clues to understand unfamiliar words.",
      "Make reasonable inferences using textual evidence.",
      "Recognize an author's purpose and draw conclusions."
    ],

    sections: [

      {
        heading: "1. What Is Reading Comprehension?",

        paragraphs: [
          "Reading comprehension is the ability to understand, interpret, and analyze written information.",
          "It involves more than recognizing words. Readers must understand the message, connect ideas, identify important details, and think about what the text means.",
          "Good reading comprehension helps students learn from textbooks, understand instructions, and evaluate information."
        ]
      },

      {
        heading: "2. Finding the Main Idea",

        paragraphs: [
          "The main idea is the central point or message of a paragraph or passage.",
          "Supporting details explain, describe, or provide evidence for the main idea.",
          "To find the main idea, ask yourself: What is the passage mostly about? What message does the author want readers to understand?"
        ],

        example: {
          problem: "Read: 'Trees provide shade, produce oxygen, and offer shelter to many animals.' What is the main idea?",

          steps: [
            "Identify what the sentences discuss.",
            "Notice that all the details describe the benefits of trees.",
            "Combine the details into one central message."
          ],

          answer: "Trees provide important benefits to people and the environment.",

          explanation: "The main idea summarizes the overall message, while the individual benefits are supporting details."
        }
      },

      {
        heading: "3. Understanding Supporting Details",

        paragraphs: [
          "Supporting details give additional information about the main idea.",
          "They may include facts, examples, descriptions, explanations, or evidence.",
          "Strong supporting details help readers understand why the main idea is important or believable."
        ]
      },

      {
        heading: "4. Using Context Clues",

        paragraphs: [
          "Context clues are hints found in nearby words and sentences that help readers understand unfamiliar vocabulary.",
          "Writers may provide definitions, synonyms, antonyms, examples, or descriptions that reveal a word's meaning.",
          "Instead of immediately using a dictionary, examine the surrounding sentence and paragraph for clues."
        ],

        example: {
          problem: "Read: 'After walking for several hours under the hot sun, Leo felt exhausted and needed to rest.' What does 'exhausted' mean?",

          steps: [
            "Look at the situation described in the sentence.",
            "Notice that Leo walked for several hours under the hot sun.",
            "Use the clue that he needed to rest."
          ],

          answer: "Exhausted means extremely tired.",

          explanation: "The surrounding details suggest that Leo has used a lot of energy and needs rest."
        }
      },

      {
        heading: "5. Making Inferences",

        paragraphs: [
          "An inference is a reasonable conclusion based on clues from a text and what the reader already knows.",
          "Authors do not always state every detail directly. Readers sometimes need to connect information to understand what is implied.",
          "A good inference must be supported by evidence in the passage. It should not be a random guess."
        ],

        example: {
          problem: "Read: 'Dark clouds gathered, and people hurried to bring their clothes indoors.' What can you infer?",

          steps: [
            "Identify the clues: dark clouds and people bringing clothes indoors.",
            "Connect the clues with what you know about weather.",
            "Determine the most reasonable conclusion."
          ],

          answer: "The people probably expect rain.",

          explanation: "The clues suggest that rain may be approaching, even though the passage does not directly say it will rain."
        }
      },

      {
        heading: "6. Identifying the Author's Purpose",

        paragraphs: [
          "An author's purpose is the reason why a text was written.",
          "Three common purposes are to inform, to persuade, and to entertain.",
          "An informative text provides facts or explanations. A persuasive text tries to influence readers' opinions or actions. An entertaining text aims to engage readers through stories, humor, or interesting experiences."
        ]
      },

      {
        heading: "7. Drawing Conclusions",

        paragraphs: [
          "Drawing a conclusion means using information from a text to reach a final understanding or judgment.",
          "Readers combine important details, evidence, and prior knowledge to form a conclusion.",
          "A conclusion should be logical and supported by the information provided in the passage."
        ]
      },

      {
        heading: "8. Key Points to Remember",

        paragraphs: [
          "The main idea tells what a passage is mostly about. Supporting details explain or prove that idea.",
          "Context clues help readers understand unfamiliar words.",
          "Inferences use textual clues and prior knowledge. Conclusions bring together information to reach a logical understanding.",
          "Identifying the author's purpose helps readers understand why a text was written."
        ]
      }

    ]

  },

  5: {

    objectives: [
      "Understand what a linear equation is.",
      "Identify the variable and constants.",
      "Solve simple linear equations using inverse operations.",
      "Check whether an answer is correct."
    ],

    sections: [

      {
        heading: "1. What Is a Linear Equation?",

        paragraphs: [
          "A linear equation is a mathematical statement that shows two expressions are equal. It usually contains a variable whose highest exponent is 1.",
          "A variable is a letter that represents an unknown number. Common examples are x, y, and a.",
          "For example, x + 3 = 7 is a linear equation because it contains the variable x."
        ]
      },

      {
        heading: "2. Understanding the Parts",

        paragraphs: [
          "In the equation x + 3 = 7, x is the variable, 3 is a constant, and 7 is the value on the right side.",
          "The equal sign means that both sides have the same value."
        ]
      },

      {
        heading: "3. How to Solve Linear Equations",

        paragraphs: [
          "The goal is to find the value of the variable.",
          "Use inverse operations to isolate the variable. Addition and subtraction are opposites. Multiplication and division are also opposites.",
          "Remember: whatever operation you apply to one side of an equation, you must also apply to the other side."
        ]
      },

      {
        heading: "4. Worked Example",

        example: {
          problem: "Solve: x + 3 = 7",

          steps: [
            "Start with: x + 3 = 7",
            "Subtract 3 from both sides: x + 3 - 3 = 7 - 3",
            "Simplify: x = 4"
          ],

          answer: "x = 4",

          explanation: "The value of x is 4 because 4 + 3 = 7."
        }
      },

      {
        heading: "5. Another Example",

        example: {
          problem: "Solve: 2x = 10",

          steps: [
            "Start with: 2x = 10",
            "Divide both sides by 2: 2x / 2 = 10 / 2",
            "Simplify: x = 5"
          ],

          answer: "x = 5",

          explanation: "The value of x is 5 because 2 multiplied by 5 equals 10."
        }
      },

      {
        heading: "6. Checking Your Answer",

        paragraphs: [
          "You can check your answer by substituting the value of the variable into the original equation.",
          "For x + 3 = 7, substitute x = 4.",
          "This gives 4 + 3 = 7. Since both sides are equal, the answer is correct."
        ]
      }


    ]

  },

  // MATHEMATICS - QUADRATIC EQUATIONS
  6: {

    objectives: [
      "Understand what a quadratic equation is.",
      "Identify the coefficients and constant term.",
      "Recognize the standard form of a quadratic equation.",
      "Solve simple quadratic equations by factoring."
    ],

    sections: [

      {
        heading: "1. What Is a Quadratic Equation?",

        paragraphs: [
          "A quadratic equation is an equation in which the highest exponent of the variable is 2.",
          "The standard form is ax² + bx + c = 0, where a, b, and c are constants and a must not equal zero.",
          "For example, x² + 5x + 6 = 0 is a quadratic equation."
        ]
      },

      {
        heading: "2. Understanding the Parts",

        paragraphs: [
          "In the equation x² + 5x + 6 = 0, the coefficient of x² is 1, the coefficient of x is 5, and the constant term is 6.",
          "The variable is x, and its highest exponent is 2.",
          "The values a, b, and c represent the coefficients and constant in the standard form."
        ]
      },

      {
        heading: "3. Solving by Factoring",

        paragraphs: [
          "Factoring means rewriting an expression as a product of simpler expressions.",
          "To solve a quadratic equation by factoring, first write it in standard form. Then factor the quadratic expression and use the zero-product property.",
          "The zero-product property states that if two factors multiply to zero, at least one of them must equal zero."
        ]
      },

      {
        heading: "4. Worked Example",

        example: {
          problem: "Solve: x² + 5x + 6 = 0",

          steps: [
            "Start with: x² + 5x + 6 = 0",
            "Factor the expression: (x + 2)(x + 3) = 0",
            "Set each factor equal to zero: x + 2 = 0 or x + 3 = 0",
            "Solve each equation: x = -2 or x = -3"
          ],

          answer: "x = -2 or x = -3",

          explanation: "Both values make the original equation equal zero."
        }
      },

      {
        heading: "5. Checking Your Answer",

        paragraphs: [
          "Substitute each solution into the original equation.",
          "For x = -2: (-2)² + 5(-2) + 6 = 4 - 10 + 6 = 0.",
          "For x = -3: (-3)² + 5(-3) + 6 = 9 - 15 + 6 = 0.",
          "Both solutions are correct."
        ]

      }

    ]

  },

  // =========================================
  // SCIENCE - THE SOLAR SYSTEM
  // =========================================

  7: {

    objectives: [
      "Define the Solar System.",
      "Identify the Sun and the eight planets.",
      "Distinguish between the inner and outer planets.",
      "Explain how gravity keeps planets in orbit.",
      "Identify other objects found in the Solar System."
    ],

    sections: [

      {
        heading: "1. What Is the Solar System?",

        paragraphs: [
          "The Solar System is made up of the Sun and all the objects that travel around it because of gravity.",
          "These objects include eight planets, their moons, dwarf planets, asteroids, comets, and other small bodies.",
          "The Sun is at the center of our Solar System. It provides the light and energy that make life on Earth possible."
        ]
      },

      {
        heading: "2. The Eight Planets",

        paragraphs: [
          "There are eight recognized planets in our Solar System. In order from the Sun, they are Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune.",
          "Mercury is the closest planet to the Sun. Venus is the hottest planet because of its thick atmosphere. Earth is the only planet currently known to support life.",
          "Mars is known as the Red Planet. Jupiter is the largest planet. Saturn is famous for its beautiful ring system.",
          "Uranus rotates on a very tilted axis. Neptune is the farthest recognized planet from the Sun."
        ]
      },

      {
        heading: "3. Inner and Outer Planets",

        paragraphs: [
          "The four inner planets are Mercury, Venus, Earth, and Mars. They are also called terrestrial planets because they have solid, rocky surfaces.",
          "The four outer planets are Jupiter, Saturn, Uranus, and Neptune. Jupiter and Saturn are gas giants, while Uranus and Neptune are ice giants.",
          "An asteroid belt separates the inner planets from the outer planets. It is located between the orbits of Mars and Jupiter."
        ]
      },

      {
        heading: "4. The Sun and Gravity",

        paragraphs: [
          "The Sun is a star made mostly of hydrogen and helium. It contains most of the mass in the Solar System.",
          "Gravity is the force of attraction between objects that have mass. The Sun's gravity keeps the planets moving in their orbits around it.",
          "A planet follows an orbit, which is the path it takes around the Sun. Most planetary orbits are slightly oval-shaped."
        ]
      },

      {
        heading: "5. Other Objects in the Solar System",

        paragraphs: [
          "Moons are natural objects that orbit planets. Earth has one natural moon, while some planets have many moons.",
          "Asteroids are rocky objects that orbit the Sun. Many are found in the asteroid belt between Mars and Jupiter.",
          "Comets are icy objects that release gas and dust when they approach the Sun. This can create a glowing coma and tail.",
          "Dwarf planets are round objects that orbit the Sun but have not cleared their orbital neighborhoods. Pluto is a well-known example."
        ]
      },

      {
        heading: "6. Why Is the Solar System Important?",

        paragraphs: [
          "Studying the Solar System helps us understand Earth, the Sun, planets, and the wider universe.",
          "It also helps scientists investigate space, understand planetary environments, and learn more about how our Solar System formed.",
          "Earth is our home, and understanding its place in the Solar System helps us appreciate our planet."
        ]

      }

    ],
 },

  // SCIENCE - CELLS AND THEIR FUNCTIONS
  8: {
    objectives: [
      "Define a cell and explain the cell theory.",
      "Identify the major parts of a cell and their functions.",
      "Compare plant cells and animal cells.",
      "Distinguish between prokaryotic and eukaryotic cells.",
      "Explain how cells form tissues, organs, and organ systems."
    ],

    sections: [
      {
        heading: "1. What Is a Cell?",

        paragraphs: [
          "A cell is the basic structural and functional unit of life. All living organisms are made up of one or more cells.",
          "Some organisms, such as bacteria, consist of only one cell. Other organisms, including humans, plants, and animals, are made up of many cells.",
          "Cells perform essential life processes such as obtaining nutrients, producing energy, growing, and reproducing."
        ]
      },

      {
        heading: "2. The Cell Theory",

        paragraphs: [
          "The cell theory is one of the fundamental ideas in biology. It explains the relationship between cells and living organisms.",
          "The cell theory has three main principles:",
          "1. All living organisms are made up of one or more cells.",
          "2. The cell is the basic unit of structure and function in living things.",
          "3. All cells come from pre-existing cells through cell division.",
          "These principles help scientists understand how living things are organized and how life continues."
        ]
      },

      {
        heading: "3. Main Parts of a Cell",

        paragraphs: [
          "The cell membrane is a thin boundary that surrounds the cell. It controls which substances enter and leave the cell.",
          "The cytoplasm is the jelly-like material inside the cell membrane. Many important chemical reactions take place there.",
          "The nucleus is a membrane-bound structure found in eukaryotic cells. It contains most of the cell's genetic material and helps control cell activities.",
          "These structures work together to help the cell survive and perform its functions."
        ]
      },

      {
        heading: "4. Cell Organelles and Their Functions",

        paragraphs: [
          "Organelles are specialized structures inside cells that perform particular jobs.",
          "Mitochondria release usable energy from food through cellular respiration. They are often called the powerhouses of the cell.",
          "Ribosomes make proteins that cells need for growth, repair, and other activities.",
          "The endoplasmic reticulum helps produce and transport materials. Rough endoplasmic reticulum has ribosomes, while smooth endoplasmic reticulum helps make lipids.",
          "The Golgi apparatus modifies, sorts, and packages proteins and other materials for transport.",
          "Vacuoles store water, nutrients, and other substances. Plant cells usually have one large central vacuole.",
          "Lysosomes contain enzymes that help break down waste materials and worn-out cell parts, especially in animal cells."
        ]
      },

      {
        heading: "5. Plant Cells and Animal Cells",

        paragraphs: [
          "Plant cells and animal cells are both eukaryotic cells. They have a nucleus, cell membrane, cytoplasm, and many similar organelles.",
          "Plant cells have a cell wall outside the cell membrane. The cell wall provides support and protection.",
          "Plant cells also contain chloroplasts, which have chlorophyll. Chloroplasts capture light energy for photosynthesis.",
          "A large central vacuole helps many plant cells store water and maintain their shape.",
          "Animal cells do not have a cell wall or chloroplasts. Their vacuoles are generally smaller than the large central vacuole found in many plant cells."
        ]
      },

      {
        heading: "6. Prokaryotic and Eukaryotic Cells",

        paragraphs: [
          "Cells can be grouped into two major types: prokaryotic and eukaryotic cells.",
          "Prokaryotic cells do not have a membrane-bound nucleus. Their genetic material is found in a region called the nucleoid. Bacteria are examples of organisms with prokaryotic cells.",
          "Eukaryotic cells have a membrane-bound nucleus and other membrane-bound organelles. Animals, plants, fungi, and protists have eukaryotic cells.",
          "One important difference is that eukaryotic cells have a nucleus, while prokaryotic cells do not."
        ]
      },

      {
        heading: "7. Specialized Cells",

        paragraphs: [
          "In multicellular organisms, some cells become specialized to perform particular functions.",
          "Red blood cells transport oxygen around the human body.",
          "Nerve cells transmit messages between different parts of the body.",
          "Muscle cells contract and relax to produce movement.",
          "Root hair cells in plants absorb water and minerals from the soil.",
          "The different shapes and structures of specialized cells help them perform their specific jobs."
        ]
      },

      {
        heading: "8. Levels of Organization",

        paragraphs: [
          "In multicellular organisms, cells work together in organized levels.",
          "Cells are groups of living units that perform basic life processes.",
          "Similar cells working together form tissues. For example, muscle tissue is made up of muscle cells.",
          "Different tissues work together to form organs, such as the heart.",
          "Organs that work together form organ systems, such as the circulatory system.",
          "Organ systems work together to support the entire organism.",
          "The correct order is: Cell → Tissue → Organ → Organ System → Organism."
        ]
      },

      {
        heading: "9. Why Are Cells Important?",

        paragraphs: [
          "Cells make life possible because they perform the essential activities needed by organisms.",
          "They obtain and use energy, remove waste, respond to their surroundings, and produce new cells.",
          "Understanding cells helps scientists study growth, health, inheritance, diseases, and the way living organisms function.",
          "Although cells vary in size, shape, and function, they all contribute to the organization and survival of living things."
        ]


      }
    ]
  },

  // SCIENCE - FORCE AND MOTION
  17: {
    objectives: [
      "Define force and describe its effects on objects.",
      "Identify common types of forces.",
      "Explain balanced and unbalanced forces.",
      "Describe Newton's three laws of motion.",
      "Differentiate speed, velocity, and acceleration.",
      "Distinguish distance from displacement.",
      "Interpret basic motion graphs.",
      "Explain friction and gravity in everyday life."
    ],

    sections: [
      {
        heading: "1. What Is Force?",
        paragraphs: [
          "A force is a push or pull that can change an object's motion, direction, or shape.",
          "Forces can make stationary objects move, slow down moving objects, speed them up, or change their direction.",
          "Force is measured in newtons (N). Force has both magnitude and direction.",
          "Examples include pushing a door, pulling a cart, and kicking a ball."
        ]
      },
      {
        heading: "2. Types of Forces",
        paragraphs: [
          "Forces can be classified as contact forces or non-contact forces.",
          "Contact forces happen when objects physically touch. Examples include friction, applied force, tension, and normal force.",
          "Non-contact forces act without direct physical contact. Examples include gravitational, magnetic, and electrostatic forces.",
          "Gravity attracts objects with mass toward one another, while magnetic forces can attract or repel certain materials."
        ]
      },
      {
        heading: "3. Balanced and Unbalanced Forces",
        paragraphs: [
          "Balanced forces cancel each other out, resulting in a net force of zero.",
          "An object at rest stays at rest, while an object already moving continues at constant velocity when the net force is zero.",
          "Unbalanced forces produce a nonzero net force and cause an object to accelerate.",
          "For example, equal pushes in opposite directions are balanced. If one push is stronger, the forces become unbalanced."
        ]
      },
      {
        heading: "4. Newton's Three Laws of Motion",
        paragraphs: [
          "Newton's First Law, also called the law of inertia, states that an object remains at rest or continues moving at constant velocity unless acted upon by a net external force.",
          "Newton's Second Law explains that an object's acceleration depends on the net force acting on it and its mass.",
          "The relationship is F = ma, where F is net force in newtons, m is mass in kilograms, and a is acceleration in meters per second squared.",
          "Newton's Third Law states that for every action force, there is an equal and opposite reaction force. These forces act on different objects.",
          "For example, a swimmer pushes water backward, and the water pushes the swimmer forward."
        ]
      },
      {
        heading: "5. Speed, Velocity, and Acceleration",
        paragraphs: [
          "Speed describes how much distance an object travels in a given amount of time.",
          "Average speed = total distance / total time.",
          "Velocity describes an object's speed in a particular direction. It is a vector quantity.",
          "Acceleration is the rate at which velocity changes over time. An object accelerates when its speed, direction, or both change.",
          "Average acceleration = change in velocity / time taken.",
          "Speed is commonly measured in meters per second (m/s), while acceleration is measured in meters per second squared (m/s²)."
        ]
      },
      {
        heading: "6. Distance and Displacement",
        paragraphs: [
          "Distance is the total length of the path traveled by an object. It does not depend on direction.",
          "Displacement is the change in an object's position from its starting point to its ending point, including direction.",
          "Distance is a scalar quantity, while displacement is a vector quantity.",
          "For example, if a student walks 5 meters east and then 3 meters west, the total distance is 8 meters and the displacement is 2 meters east."
        ]
      },
      {
        heading: "7. Motion Graphs",
        paragraphs: [
          "Motion graphs help describe how an object's position or velocity changes over time.",
          "A distance-time graph shows how far an object travels as time passes.",
          "The slope of a distance-time graph represents speed.",
          "A horizontal line on a distance-time graph means the object is not changing its distance from the starting reference point.",
          "A velocity-time graph shows how velocity changes over time. Its slope represents acceleration."
        ]
      },
      {
        heading: "8. Friction and Gravity",
        paragraphs: [
          "Friction is a force that opposes relative motion between surfaces that are touching.",
          "Friction can slow moving objects, produce heat, and help us walk without slipping.",
          "Gravity is an attractive force between objects with mass. Earth's gravity pulls objects toward its center.",
          "Gravity gives objects weight, while mass measures the amount of matter in an object.",
          "Friction and gravity affect many everyday activities, including walking, cycling, and falling objects."
        ]
      },
      {
        heading: "9. Applications in Everyday Life",
        paragraphs: [
          "The principles of force and motion help explain how vehicles move, how sports equipment works, and how people walk or run.",
          "Seat belts help protect passengers by restraining their motion when a vehicle suddenly slows down.",
          "Engineers apply Newton's laws when designing vehicles, buildings, machines, and other structures.",
          "Understanding force and motion helps us explain and predict the movement of objects around us."
        ]
      }
    ]
  }

};


// =========================================
// KIS - LESSON QUIZ DATABASE
// =========================================

const kisLessonQuizzes = {

  // ENGLISH - PARTS OF SPEECH
  3: [

    {
      question: "Which part of speech names a person, place, thing, or idea?",
      choices: [
        "Verb",
        "Noun",
        "Adjective",
        "Adverb"
      ],
      correctAnswer: 1,
      explanation:
        "A noun names a person, place, thing, or idea."
    },

    {
      question: "Which word is the verb in the sentence: 'The students study every evening'?",
      choices: [
        "Students",
        "Every",
        "Study",
        "Evening"
      ],
      correctAnswer: 2,
      explanation:
        "Study is the verb because it expresses the action performed by the students."
    },

    {
      question: "Which part of speech describes or modifies a noun?",
      choices: [
        "Adjective",
        "Preposition",
        "Conjunction",
        "Interjection"
      ],
      correctAnswer: 0,
      explanation:
        "An adjective describes a noun or pronoun, often telling what kind, which one, or how many."
    },

    {
      question: "What is the adverb in this sentence: 'She sings beautifully'?",
      choices: [
        "She",
        "Sings",
        "Beautifully",
        "Sentence"
      ],
      correctAnswer: 2,
      explanation:
        "Beautifully is an adverb because it describes how she sings."
    },

    {
      question: "Which part of speech connects words, phrases, or clauses?",
      choices: [
        "Pronoun",
        "Conjunction",
        "Adjective",
        "Noun"
      ],
      correctAnswer: 1,
      explanation:
        "A conjunction connects words, phrases, or clauses. Examples include and, but, and because."
    }

  ],

  // ENGLISH - READING COMPREHENSION
  4: [

    {
      question: "What is the main idea of a passage?",
      choices: [
        "A minor detail",
        "The central message or point",
        "The meaning of one difficult word",
        "The name of the author"
      ],
      correctAnswer: 1,
      explanation:
        "The main idea is the central message or most important point of a passage."
    },

    {
      question: "What does making an inference mean when reading?",
      choices: [
        "Copying every sentence",
        "Guessing without evidence",
        "Using clues and prior knowledge to reach a conclusion",
        "Reading only the title"
      ],
      correctAnswer: 2,
      explanation:
        "An inference combines clues from the text with prior knowledge to reach a reasonable conclusion."
    },

    {
      question: "What is the purpose of identifying supporting details?",
      choices: [
        "To support and explain the main idea",
        "To replace the main idea",
        "To introduce unrelated information",
        "To identify every punctuation mark"
      ],
      correctAnswer: 0,
      explanation:
        "Supporting details provide information, examples, and evidence that explain the main idea."
    },

    {
      question: "Read the statement: 'Mia brought an umbrella because dark clouds covered the sky.' What can you reasonably infer?",
      choices: [
        "Mia is going swimming",
        "Mia expects that it may rain",
        "Mia dislikes cloudy weather",
        "Mia has lost her umbrella"
      ],
      correctAnswer: 1,
      explanation:
        "Dark clouds and the umbrella suggest that Mia expects possible rain."
    },

    {
      question: "Why should readers examine the context around an unfamiliar word?",
      choices: [
        "To skip the entire paragraph",
        "To change the author's message",
        "To help determine the word's meaning",
        "To count the sentences"
      ],
      correctAnswer: 2,
      explanation:
        "Context clues provide surrounding information that helps readers understand unfamiliar words."
    }

  ],

  // =========================================
  // MATHEMATICS - LINEAR EQUATIONS
  5: [

    {
      question: "What is a linear equation?",

      choices: [
        "An equation with a variable whose highest exponent is 1",
        "An equation with only multiplication",
        "An equation with no variables",
        "An equation whose highest exponent is 2"
      ],

      correctAnswer: 0,

      explanation:
        "A linear equation has a variable with a highest exponent of 1."
    },

    {
      question: "In x + 3 = 7, what is the variable?",

      choices: [
        "3",
        "7",
        "x",
        "10"
      ],

      correctAnswer: 2,

      explanation:
        "The letter x is the variable because it represents an unknown number."
    },

    {
      question: "Solve: x + 3 = 7",

      choices: [
        "x = 3",
        "x = 4",
        "x = 7",
        "x = 10"
      ],

      correctAnswer: 1,

      explanation:
        "Subtract 3 from both sides. Therefore, x = 7 - 3 = 4."
    },

    {
      question: "Solve: 2x = 10",

      choices: [
        "x = 2",
        "x = 10",
        "x = 20",
        "x = 5"
      ],

      correctAnswer: 3,

      explanation:
        "Divide both sides by 2. Therefore, x = 10 / 2 = 5."
    },

    {
      question: "How can you check whether your answer is correct?",

      choices: [
        "Change the original equation",
        "Ignore the variable",
        "Substitute your answer into the original equation",
        "Add random numbers"
      ],

      correctAnswer: 2,

      explanation:
        "Substitute the value of the variable into the original equation. If both sides are equal, the answer is correct."
    }
  ],

  // MATHEMATICS - QUADRATIC EQUATIONS
  6: [

    {
      question: "What is the highest exponent of the variable in a quadratic equation?",

      choices: [
        "1",
        "2",
        "3",
        "4"
      ],

      correctAnswer: 1,

      explanation:
        "A quadratic equation has a degree of 2 because its highest variable exponent is 2."
    },

    {
      question: "Which is the standard form of a quadratic equation?",

      choices: [
        "ax + b = 0",
        "ax² + bx + c = 0, where a ≠ 0",
        "ax³ + bx² + c = 0",
        "a + b + c = 0"
      ],

      correctAnswer: 1,

      explanation:
        "The standard form is ax² + bx + c = 0, where a cannot be zero."
    },

    {
      question: "In x² + 5x + 6 = 0, what is the constant term?",

      choices: [
        "1",
        "5",
        "6",
        "0"
      ],

      correctAnswer: 2,

      explanation:
        "The constant term is 6 because it has no variable attached to it."
    },

    {
      question: "What is the correct factorization of x² + 5x + 6?",

      choices: [
        "(x + 1)(x + 6)",
        "(x + 2)(x + 3)",
        "(x - 2)(x - 3)",
        "(x + 5)(x + 6)"
      ],

      correctAnswer: 1,

      explanation:
        "The numbers 2 and 3 multiply to 6 and add up to 5. Therefore, the factors are (x + 2)(x + 3)."
    },

    {
      question: "What are the solutions of x² + 5x + 6 = 0?",

      choices: [
        "x = 2 and x = 3",
        "x = -2 and x = -3",
        "x = 5 and x = 6",
        "x = -5 and x = -6"
      ],

      correctAnswer: 1,

      explanation:
        "Set each factor equal to zero: x + 2 = 0 or x + 3 = 0. Therefore, x = -2 or x = -3."

    }

  ],

  // =========================================
  // SCIENCE - THE SOLAR SYSTEM
  // =========================================

  7: [

    {
      question: "What is at the center of our Solar System?",
      choices: [
        "Earth",
        "The Moon",
        "The Sun",
        "Jupiter"
      ],
      correctAnswer: 2,
      explanation: "The Sun is at the center of our Solar System, and its gravity keeps the planets in orbit."
    },

    {
      question: "How many recognized planets are in our Solar System?",
      choices: [
        "Seven",
        "Eight",
        "Nine",
        "Ten"
      ],
      correctAnswer: 1,
      explanation: "There are eight recognized planets: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune."
    },

    {
      question: "Which planet is closest to the Sun?",
      choices: [
        "Venus",
        "Earth",
        "Mars",
        "Mercury"
      ],
      correctAnswer: 3,
      explanation: "Mercury is the closest planet to the Sun."
    },

    {
      question: "Which planet is the largest in the Solar System?",
      choices: [
        "Saturn",
        "Jupiter",
        "Neptune",
        "Earth"
      ],
      correctAnswer: 1,
      explanation: "Jupiter is the largest planet in our Solar System."
    },

    {
      question: "Which planet is famous for its beautiful ring system?",
      choices: [
        "Mars",
        "Venus",
        "Saturn",
        "Mercury"
      ],
      correctAnswer: 2,
      explanation: "Saturn is famous for its prominent ring system."
    },

    {
      question: "Which group contains only inner planets?",
      choices: [
        "Jupiter, Saturn, Uranus, Neptune",
        "Mercury, Venus, Earth, Mars",
        "Earth, Jupiter, Mars, Saturn",
        "Venus, Saturn, Uranus, Neptune"
      ],
      correctAnswer: 1,
      explanation: "The four inner planets are Mercury, Venus, Earth, and Mars."
    },

    {
      question: "What force keeps planets moving in their orbits around the Sun?",
      choices: [
        "Friction",
        "Magnetism",
        "Gravity",
        "Electricity"
      ],
      correctAnswer: 2,
      explanation: "The Sun's gravitational attraction helps keep planets in orbit."
    },

    {
      question: "Where is the asteroid belt mainly located?",
      choices: [
        "Between Earth and Mars",
        "Between Mars and Jupiter",
        "Between Jupiter and Saturn",
        "Beyond Neptune"
      ],
      correctAnswer: 1,
      explanation: "The main asteroid belt is located between the orbits of Mars and Jupiter."
    },

    {
      question: "What are comets mainly made of?",
      choices: [
        "Hot liquid metal",
        "Ice, dust, and rocky material",
        "Only oxygen",
        "Pure sunlight"
      ],
      correctAnswer: 1,
      explanation: "Comets contain ice, dust, and rocky material. They can release gas and dust when they approach the Sun."
    },

    {
      question: "Why is Pluto classified as a dwarf planet?",
      choices: [
        "It does not orbit the Sun",
        "It is a natural moon",
        "It has not cleared its orbital neighborhood",
        "It is larger than Jupiter"
      ],
      correctAnswer: 2,
      explanation: "Pluto orbits the Sun and is nearly round, but it has not cleared its orbital neighborhood."
    }

  ],

  // SCIENCE - CELLS AND THEIR FUNCTIONS
  8: [
    {
      question: "What is the basic structural and functional unit of life?",
      choices: [
        "Tissue",
        "Cell",
        "Organ",
        "Organ system"
      ],
      correctAnswer: 1,
      explanation: "The cell is the basic structural and functional unit of all living organisms."
    },

    {
      question: "Which cell structure controls most activities of a eukaryotic cell?",
      choices: [
        "Cell wall",
        "Vacuole",
        "Nucleus",
        "Cytoplasm"
      ],
      correctAnswer: 2,
      explanation: "The nucleus contains genetic material and helps control the activities of a eukaryotic cell."
    },

    {
      question: "Which organelle releases energy from food through cellular respiration?",
      choices: [
        "Mitochondrion",
        "Ribosome",
        "Chloroplast",
        "Golgi apparatus"
      ],
      correctAnswer: 0,
      explanation: "Mitochondria are the main sites of cellular respiration, which transfers energy from food into ATP."
    },

    {
      question: "What is the main function of the cell membrane?",
      choices: [
        "To produce sunlight",
        "To control what enters and leaves the cell",
        "To store genetic information",
        "To make proteins"
      ],
      correctAnswer: 1,
      explanation: "The cell membrane regulates the movement of substances into and out of the cell."
    },

    {
      question: "Which structure is found in plant cells but not in animal cells?",
      choices: [
        "Cell membrane",
        "Cytoplasm",
        "Nucleus",
        "Cell wall"
      ],
      correctAnswer: 3,
      explanation: "Plant cells have a cell wall that provides support and protection. Animal cells do not have one."
    },

    {
      question: "Which organelle carries out photosynthesis in plant cells?",
      choices: [
        "Mitochondrion",
        "Chloroplast",
        "Ribosome",
        "Lysosome"
      ],
      correctAnswer: 1,
      explanation: "Chloroplasts contain chlorophyll, which absorbs light energy for photosynthesis."
    },

    {
      question: "What is the jelly-like material that fills much of the cell?",
      choices: [
        "Cytoplasm",
        "Cell wall",
        "Chromosome",
        "Nuclear membrane"
      ],
      correctAnswer: 0,
      explanation: "Cytoplasm is the material inside the cell membrane where many cell activities take place."
    },

    {
      question: "Which organelle is responsible for making proteins?",
      choices: [
        "Vacuole",
        "Ribosome",
        "Chloroplast",
        "Mitochondrion"
      ],
      correctAnswer: 1,
      explanation: "Ribosomes are the structures where proteins are made."
    },

    {
      question: "Which statement correctly describes prokaryotic cells?",
      choices: [
        "They always contain a nucleus.",
        "They have no genetic material.",
        "They do not have a membrane-bound nucleus.",
        "They are always larger than eukaryotic cells."
      ],
      correctAnswer: 2,
      explanation: "Prokaryotic cells, such as bacteria, lack a membrane-bound nucleus. Their DNA is located in a region called the nucleoid."
    },

    {
      question: "Which sequence shows the correct levels of organization in a multicellular organism?",
      choices: [
        "Organ → Cell → Tissue → Organ system",
        "Cell → Tissue → Organ → Organ system",
        "Tissue → Cell → Organ system → Organ",
        "Cell → Organ → Organ system → Tissue"
      ],
      correctAnswer: 1,
      explanation: "Cells form tissues, tissues form organs, and organs work together in organ systems."

    }
  ],

  // SCIENCE - FORCE AND MOTION
  17: [
    {
      question: "What is a force?",
      choices: [
        "A push or pull",
        "A type of energy",
        "The amount of matter in an object",
        "The distance traveled by an object"
      ],
      correctAnswer: 0,
      explanation: "A force is a push or pull that can change an object's motion, direction, or shape."
    },

    {
      question: "What is the SI unit of force?",
      choices: [
        "Meter",
        "Kilogram",
        "Newton",
        "Second"
      ],
      correctAnswer: 2,
      explanation: "Force is measured in newtons (N), named after scientist Isaac Newton."
    },

    {
      question: "Which of the following is a contact force?",
      choices: [
        "Gravity",
        "Magnetic force",
        "Electrostatic force",
        "Friction"
      ],
      correctAnswer: 3,
      explanation: "Friction is a contact force because it acts between surfaces that touch."
    },

    {
      question: "What is the net force when forces are balanced?",
      choices: [
        "10 newtons",
        "Zero newtons",
        "100 newtons",
        "It cannot be measured"
      ],
      correctAnswer: 1,
      explanation: "Balanced forces cancel each other out, resulting in a net force of zero."
    },

    {
      question: "Which law of motion is also called the law of inertia?",
      choices: [
        "Newton's First Law",
        "Newton's Second Law",
        "Newton's Third Law",
        "Law of Universal Gravitation"
      ],
      correctAnswer: 0,
      explanation: "Newton's First Law states that an object maintains its state of rest or constant velocity unless acted upon by a net external force."
    },

    {
      question: "Which equation represents Newton's Second Law of Motion?",
      choices: [
        "Speed = Distance / Time",
        "F = ma",
        "Distance = Speed × Time",
        "Mass = Force × Acceleration"
      ],
      correctAnswer: 1,
      explanation: "Newton's Second Law is expressed as F = ma, where F is net force, m is mass, and a is acceleration."
    },

    {
      question: "What does Newton's Third Law state?",
      choices: [
        "Objects always remain at rest.",
        "Force is measured in meters.",
        "Every action force has an equal and opposite reaction force.",
        "Heavier objects always move faster."
      ],
      correctAnswer: 2,
      explanation: "Newton's Third Law states that action and reaction forces are equal in magnitude and opposite in direction, acting on different objects."
    },

    {
      question: "What does speed measure?",
      choices: [
        "The direction of motion",
        "The total mass of an object",
        "The force acting on an object",
        "The distance traveled per unit of time"
      ],
      correctAnswer: 3,
      explanation: "Speed tells us how much distance an object travels in a given amount of time."
    },

    {
      question: "A student walks 5 meters east and then 3 meters west. What is the student's displacement?",
      choices: [
        "8 meters east",
        "2 meters east",
        "2 meters west",
        "8 meters west"
      ],
      correctAnswer: 1,
      explanation: "Displacement considers the change in position and direction. The student ends 2 meters east of the starting point."
    },

    {
      question: "Which force pulls objects toward the center of Earth?",
      choices: [
        "Friction",
        "Magnetic force",
        "Gravity",
        "Applied force"
      ],
      correctAnswer: 2,
      explanation: "Gravity is the attractive force that pulls objects with mass toward one another. Earth's gravity pulls objects toward its center."
    }
  ]

};

// =========================================
// KIS - FIRESTORE PUBLISHED LESSONS
// =========================================

async function kisLoadPublishedLessons() {

  const cacheKey = "kisPublishedLessons";

  // Read previously cached published lessons.
  function getCachedLessons() {
    try {
      return JSON.parse(
        localStorage.getItem(cacheKey) || "[]"
      );
    } catch (error) {
      console.error("Unable to read lesson cache:", error);
      return [];
    }
  }

  // Use cached lessons when Firestore is unavailable.
  if (!window.kisDb || !navigator.onLine) {
    return getCachedLessons();
  }

  try {

    const snapshot = await kisDb.collection("lessons")
      .where("status", "==", "published")
      .get();

    const lessons = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      source: "firestore"
    }));

    // Cache the complete published lesson list.
    try {
      localStorage.setItem(
        cacheKey,
        JSON.stringify(lessons)
      );

      // Cache each lesson separately for offline reading.
      lessons.forEach(lesson => {
        localStorage.setItem(
          "kisLesson_" + lesson.id,
          JSON.stringify(lesson)
        );
      });

    } catch (cacheError) {
      console.error("Unable to save lesson cache:", cacheError);
    }

    return lessons;

  } catch (error) {

    console.error("Unable to load published lessons:", error);

    return getCachedLessons();

  }
}

