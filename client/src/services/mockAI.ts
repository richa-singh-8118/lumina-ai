export interface Question {
    id: string;
    text: string;
    options: string[];
    correctIndex: number;
}

export interface Lesson {
    id: string;
    title: string;
    content: string;
    type: 'video' | 'text' | 'interactive';
    duration: string;
    quiz?: Question[];
}

export interface Course {
    id: string;
    title: string;
    description: string;
    progress: number;
    lessons: Lesson[];
}

interface QuizTemplate {
    text: string;
    options: string[];
    correctIndex: number;
}

interface SpecializedContent {
    intro: string;
    historicalContext: string;
    technicalBreakdown: string;
    modernImplications: string;
    quiz: QuizTemplate[];
}

const specializedContent: Record<string, SpecializedContent> = {
    math: {
        intro: "Mathematics is the foundational language of logical reasoning and the bedrock of modern civilization. From the architectural marvels of the ancient world to the complex algorithms driving today's digital economy, math provides the tools to quantify reality and predict the future. It is not merely about numbers, but about structure, space, and change.",
        historicalContext: "The journey of mathematics began with simple tally marks and evolved through the genius of ancient Babylonians, Greeks, and Indians. The introduction of zero by Brahmagupta, the development of algebra by Al-Khwarizmi, and the simultaneous invention of calculus by Newton and Leibniz have fundamentally reshaped how we interact with the physical world. Each era added a new layer of abstraction, allowing us to solve increasingly complex problems.",
        technicalBreakdown: "At its core, mathematics is divided into several interconnected branches:\n- **Arithmetic**: The study of numbers and basic operations.\n- **Algebra**: The language of relationships and variables, allowing us to generalize arithmetic.\n- **Geometry**: The analysis of shapes, sizes, and the properties of space.\n- **Calculus**: The mathematics of change and motion, essential for physics and engineering.\n- **Statistics**: The science of data, probability, and uncertainty, critical for modern science and AI.\n- **Number Theory**: The study of integers and their properties, the basis of modern cryptography.",
        modernImplications: "Today, mathematics is the invisible force behind every Google search, every stock market trade, and every weather forecast. It enables cryptography for secure communication, powers the training of large language models, and allows engineers to simulate spacecraft journeys to distant planets. Without advanced math, the digital age would cease to exist.",
        quiz: [
            { text: "Which mathematical constant represents the ratio of a circle's circumference to its diameter?", options: ["Euler's Number (e)", "Pi (π)", "Golden Ratio (φ)", "Planck's Constant"], correctIndex: 1 },
            { text: "Who is widely credited with formalizing the rules of Algebra in his 9th-century treatise?", options: ["Pythagoras", "Isaac Newton", "Al-Khwarizmi", "Euclid"], correctIndex: 2 },
            { text: "In calculus, what does the 'derivative' of a function represent?", options: ["The area under a curve", "The average value", "The instantaneous rate of change", "The total sum"], correctIndex: 2 },
            { text: "What is the primary focus of 'Discrete Mathematics'?", options: ["Continuous curves", "Finite structures like graphs and logic", "Fluid dynamics", "Planetary motion"], correctIndex: 1 },
            { text: "Which field of mathematics is primarily used in cryptography?", options: ["Calculus", "Number Theory", "Geometry", "Statistics"], correctIndex: 1 },
            { text: "What is the Pythagorean theorem used for?", options: ["Calculating interest", "Finding the length of a side in a right triangle", "Predicting weather", "Sorting lists"], correctIndex: 1 }
        ]
    },
    science: {
        intro: "Science is the systematic study of the structure and behavior of the physical and natural world through observation, experimentation, and the testing of theories against the evidence obtained. It is humanity's candle in the dark.",
        historicalContext: "The Scientific Revolution of the 16th and 17th centuries marked a paradigm shift in human history. Figures like Copernicus, Galileo, and Vesalius challenged dogma with empirical evidence, leading to the development of the 'Scientific Method'—a rigorous process that prioritizes observation over intuition. This shift moved us from relying on authority to relying on testable reality.",
        technicalBreakdown: "Science is traditionally categorized into three major domains:\n- **Life Sciences (Biology)**: The study of living organisms, from single-celled bacteria to complex ecosystems.\n- **Physical Sciences (Physics/Chemistry)**: The study of matter, energy, and the fundamental forces of nature.\n- **Earth Sciences**: The study of our planet, its atmosphere, and its place in the solar system.\n- **Formal Sciences**: Fields like logic and systems theory that support empirical sciences.",
        modernImplications: "Modern science is currently tackling global challenges like climate change, pandemic prevention, and sustainable energy. We are entering an era of 'Big Science' where international collaborations like the Large Hadron Collider and the James Webb Space Telescope push the boundaries of what humans can know about the origin of the universe.",
        quiz: [
            { text: "What is the primary characteristic of the 'Scientific Method'?", options: ["Reliance on traditional beliefs", "Empirical evidence and reproducibility", "Intuition and guessing", "Public opinion polls"], correctIndex: 1 },
            { text: "Which molecule carries the genetic instructions for the development and functioning of all known living organisms?", options: ["H2O", "Glucose", "DNA", "CO2"], correctIndex: 2 },
            { text: "What fundamental force is responsible for keeping planets in orbit around stars?", options: ["Electromagnetism", "Strong Nuclear Force", "Gravity", "Weak Nuclear Force"], correctIndex: 2 },
            { text: "Which state of matter has a definite volume but takes the shape of its container?", options: ["Solid", "Liquid", "Gas", "Plasma"], correctIndex: 1 },
            { text: "What is the basic unit of life?", options: ["Atom", "Molecule", "Cell", "Tissue"], correctIndex: 2 },
            { text: "Who proposed the Theory of General Relativity?", options: ["Isaac Newton", "Albert Einstein", "Niels Bohr", "Marie Curie"], correctIndex: 1 }
        ]
    },
    ai: {
        intro: "Artificial Intelligence (AI) is the simulation of human intelligence processes by machines, especially computer systems. This includes learning, reasoning, and self-correction. It represents the next leap in our tool-making history.",
        historicalContext: "The quest for AI began in the 1950s with pioneers like Alan Turing, who proposed the 'Turing Test' to measure machine intelligence. After decades of fluctuating interest known as 'AI Winters,' the field exploded in the 2010s due to the availability of massive data and powerful GPU computing, leading to the current deep learning boom.",
        technicalBreakdown: "AI is a broad field with several key sub-disciplines:\n- **Machine Learning (ML)**: Using algorithms to find patterns in data without explicit programming.\n- **Deep Learning**: A subset of ML inspired by the neural pathways of the human brain (neural networks).\n- **Natural Language Processing (NLP)**: Enabling computers to understand and generate human text and speech.\n- **Computer Vision**: Allowing machines to interpret and process visual information from the world.\n- **Robotics**: The intersection of AI and physical machines.",
        modernImplications: "AI is redefining every industry, from healthcare (diagnosing diseases) to transportation (self-driving cars) and creative arts (generative design). However, it also raises critical questions about ethics, bias, job displacement, and the potential for 'Artificial General Intelligence' (AGI) that could surpass human capability.",
        quiz: [
            { text: "What is the primary difference between 'Narrow AI' and 'General AI'?", options: ["Narrow AI is faster", "General AI can perform any intellectual task a human can", "Narrow AI uses more energy", "There is no difference"], correctIndex: 1 },
            { text: "Which technique is most associated with the 'Deep Learning' revolution?", options: ["Linear Regression", "Neural Networks", "Decision Trees", "Sorting Algorithms"], correctIndex: 1 },
            { text: "What does the term 'Training' mean in the context of Machine Learning?", options: ["Running the program on a treadmill", "The process of providing data to an algorithm to improve its performance", "Installing the software", "Repairing the hardware"], correctIndex: 1 },
            { text: "What is 'Supervised Learning'?", options: ["Learning with a teacher present", "Training on labeled data", "Watching videos", "Learning without data"], correctIndex: 1 },
            { text: "Which famous test is used to determine if a machine exhibits intelligent behavior?", options: ["The IQ Test", "The Turing Test", "The Rorschach Test", "The SAT"], correctIndex: 1 },
            { text: "What is a 'Neural Network' loosely modeled after?", options: ["The internet", "The human brain", "Road networks", "Ant colonies"], correctIndex: 1 }
        ]
    },
    coding: {
        intro: "Coding, or computer programming, is the process of designing and building an executable computer program to accomplish a specific computing result. It is the literacy of the 21st century.",
        historicalContext: "The first programmer is often cited as Ada Lovelace, who wrote an algorithm for Charles Babbage's Analytical Engine in the mid-19th century. Since then, we have evolved from physical punch cards and assembly language to high-level symbolic languages that look more like English than machine code, and now to AI-assisted coding.",
        technicalBreakdown: "Software development is a multi-layered craft:\n- **Frontend**: What the user sees and interacts with (HTML, CSS, JavaScript).\n- **Backend**: The server-side logic and database management (Python, Node.js, SQL).\n- **DevOps**: The infrastructure that allows code to be deployed and scaled securely.\n- **Algorithms & Data Structures**: The step-by-step logic and organization of data used to solve computational problems efficiently.",
        modernImplications: "In the 21st century, code is the infrastructure of the world. It governs bank transfers, controls flight paths, and connects people across continents through social platforms. Knowing how to code is effectively a form of 'digital literacy' that empowers you to build and automate.",
        quiz: [
            { text: "What is a 'Bug' in the context of software development?", options: ["A physical insect in the computer", "An error or flaw in the program's logic", "A type of computer mouse", "A feature requested by users"], correctIndex: 1 },
            { text: "What is the purpose of 'Version Control' systems like Git?", options: ["To make the computer faster", "To track changes in code and enable collaboration", "To check the battery level", "To play video games"], correctIndex: 1 },
            { text: "Which of these is consider a 'High-Level' programming language?", options: ["Binary", "Assembly", "Python", "Machine Code"], correctIndex: 2 },
            { text: "What does HTML stand for?", options: ["Hyper Tool Machine Language", "HyperText Markup Language", "High Text Making Language", "Hyperlink Text Mode Language"], correctIndex: 1 },
            { text: "What is an 'Algorithm'?", options: ["A type of computer screen", "A step-by-step set of operations to solve a problem", "A musical rhythm", "A database"], correctIndex: 1 },
            { text: "What is the main function of CSS?", options: ["Structuring content", "Styling and layout of web pages", "Server-side logic", "Database management"], correctIndex: 1 }
        ]
    },
    history: {
        intro: "History is the study of change over time, engaging with the past through documents, artifacts, and memory. It is not just a collection of dates, but a complex narrative of cause and effect that explains our present reality.",
        historicalContext: "Herodotus, the 'Father of History', established the tradition of systematic investigation in the 5th century BCE. Since then, the discipline has evolved from recounting grand political narratives to social history, examining the lives of ordinary people.",
        technicalBreakdown: "Historians use a rigorous methodology:\n- **Primary Sources**: First-hand accounts (letters, diaries, official records).\n- **Secondary Sources**: Analysis written by other historians.\n- **Historiography**: The study of how history itself is written and interpreted over time.\n- **Causality**: Determining why events happened, not just when.",
        modernImplications: "Understanding history is vital for citizenship. It helps us understand current geopolitical conflicts, detect propaganda, and avoid repeating the tragic mistakes of the past.",
        quiz: [
            { text: "Who is known as the 'Father of History'?", options: ["Socrates", "Herodotus", "Plato", "Homer"], correctIndex: 1 },
            { text: "What is a 'Primary Source'?", options: ["A textbook", "A wikipedia article", "A diary written during the event", "A movie about the event"], correctIndex: 2 },
            { text: "What does 'Historiography' study?", options: ["Geography", "The methodology and history of historical writing", "Fossils", "The future"], correctIndex: 1 },
            { text: "Which event marked the beginning of World War I?", options: ["Invasion of Poland", "Assassination of Archduke Franz Ferdinand", "The Fall of Rome", "The French Revolution"], correctIndex: 1 },
            { text: "The 'Industrial Revolution' began in which century?", options: ["16th", "18th", "20th", "12th"], correctIndex: 1 },
            { text: "What was the main purpose of the Rosetta Stone?", options: ["Decoration", "Deciphering Egyptian Hieroglyphs", "Building walls", "Weighing grain"], correctIndex: 1 }
        ]
    },
    literature: {
        intro: "Literature is the art of written work. It records the human experience, preserving our dreams, fears, and ideas across centuries. It enhances empathy by allowing us to live a thousand lives in one.",
        historicalContext: "From the Epic of Gilgamesh written on clay tablets to the plays of Shakespeare and the modern novel, literature has always mirrored the society that produced it. The invention of the Printing Press in 1440 democratized reading and changed the world.",
        technicalBreakdown: "Literary analysis involves:\n- **Theme**: The underlying message or central idea.\n- **Motif**: A recurring element that has symbolic significance.\n- **Characterization**: How characters are constructed and developed.\n- **Structure**: The arc of the narrative (Exposition, Climax, Resolution).",
        modernImplications: "In a digital age of short attention spans, reading literature trains deep focus and critical thinking. It remains a powerful tool for social critique and personal growth.",
        quiz: [
            { text: "Who wrote 'Romeo and Juliet'?", options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"], correctIndex: 1 },
            { text: "What is a 'Haiku'?", options: ["A long novel", "A Japanese poem of 17 syllables", "A type of sword", "A tragic play"], correctIndex: 1 },
            { text: "In literature, what is a 'Metaphor'?", options: ["A direct comparison using 'like' or 'as'", "A figure of speech stating one thing is another", "A rhyme scheme", "A table of contents"], correctIndex: 1 },
            { text: "Who is the author of '1984'?", options: ["Aldous Huxley", "George Orwell", "Ray Bradbury", "J.K. Rowling"], correctIndex: 1 },
            { text: "What is the 'Protagonist'?", options: ["The villain", "The main character", "The narrator", "The setting"], correctIndex: 1 },
            { text: "The 'Climax' of a story is:", options: ["The beginning", "The turning point of highest tension", "The end", "The introduction"], correctIndex: 1 }
        ]
    },
    art: {
        intro: "Art is a diverse range of human activity, and resulting product, that involves creative and imaginative talent expressive of technical proficiency, beauty, emotional power, or conceptual ideas.",
        historicalContext: "Art dates back to prehistoric cave paintings in Lascaux. It has moved through eras like the Renaissance (Realism), Impressionism (Light), Cubism (Abstraction), and Pop Art (Commercialism), continuously challenging definitions of beauty.",
        technicalBreakdown: "Visual analysis considers:\n- **Composition**: The arrangement of visual elements.\n- **Color Theory**: The relationship between colors (Complementary, Analogous).\n- **Perspective**: Creating the illusion of depth.\n- **Medium**: The material used (Oil, Acrylic, Charcoal, Digital).",
        modernImplications: "Art is today a global industry and a critical form of political expression. Digital art and NFTs are currently redefining ownership and value in the art world.",
        quiz: [
            { text: "Who painted the 'Mona Lisa'?", options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Claude Monet"], correctIndex: 1 },
            { text: "What represents 'Primary Colors' in painting?", options: ["Red, Blue, Yellow", "Green, Orange, Purple", "Black, White, Grey", "Cyan, Magenta, Yellow"], correctIndex: 0 },
            { text: "Which movement is Salvador Dalí associated with?", options: ["Realism", "Surrealism", "Cubism", "Impressionism"], correctIndex: 1 },
            { text: "What is 'Perspective' in drawing?", options: ["Using bright colors", "The technique of creating depth on a flat surface", "Drawing faces only", "Using distinct lines"], correctIndex: 1 },
            { text: "Who painted 'The Starry Night'?", options: ["Leonardo da Vinci", "Vincent van Gogh", "Michelangelo", "Rembrandt"], correctIndex: 1 },
            { text: "What material is 'Terracotta'?", options: ["Metal", "Baked clay", "Glass", "Plastic"], correctIndex: 1 }
        ]
    },
    health: {
        intro: "Health is a state of complete physical, mental, and social well-being and not merely the absence of disease or infirmity. It is the most valuable asset a human being possesses.",
        historicalContext: "From the herbal remedies of ancient China to the germ theory of the 19th century and modern robotic surgery, healthcare has extended human life expectancy dramatically.",
        technicalBreakdown: "Key pillars of health:\n- **Nutrition**: Fueling the body with macronutrients and micronutrients.\n- **Exercise**: Cardiovascular and resistance training for system maintenance.\n- **Sleep**: The critical period for neurological and physical repair.\n- **Mental Health**: Handling stress, emotion, and cognitive function.",
        modernImplications: "We are facing a double-edged sword: advanced medicine can cure once-fatal diseases, but lifestyle diseases (diabetes, heart disease) caused by modern habits are rising. Preventive health is the new frontier.",
        quiz: [
            { text: "What is the recommended amount of sleep for an average adult?", options: ["4-5 hours", "7-9 hours", "10-12 hours", "Do not sleep"], correctIndex: 1 },
            { text: "Which nutrient is the body's primary source of energy?", options: ["Protein", "Carbohydrates", "Vitamins", "Water"], correctIndex: 1 },
            { text: "What does BMI stand for?", options: ["Body Mass Index", "Basic Metabolic Indicator", "Big Muscle Increase", "Body Measurement Integer"], correctIndex: 0 },
            { text: "Which organ pumps blood throughout the body?", options: ["Liver", "Brain", "Heart", "Lungs"], correctIndex: 2 },
            { text: "What vitamin is produced when the skin is exposed to sunlight?", options: ["Vitamin C", "Vitamin D", "Vitamin A", "Vitamin B12"], correctIndex: 1 },
            { text: "What is the most effective way to prevent the spread of germs?", options: ["Touching face", "Hand washing", "Ignoring them", "Sleeping"], correctIndex: 1 }
        ]
    },
    react: {
        intro: "React is a JavaScript library for building user interfaces, developed by Facebook. It revolutionized web development by introducing the concept of a 'Virtual DOM' and component-based architecture.",
        historicalContext: "Released in 2013, React was initially met with skepticism for mixing HTML and JavaScript (JSX). However, its declarative nature and efficient update cycle quickly made it the most popular frontend library in the world, influencing frameworks like Vue and Svelte.",
        technicalBreakdown: "React revolves around three core concepts:\n- **Components**: Reusable UI building blocks.\n- **State & Props**: How data flows and changes within an app.\n- **Hooks**: Functions that let you 'hook into' React state and lifecycle features (e.g., `useState`, `useEffect`).",
        modernImplications: "React powers millions of websites, including Facebook, Instagram, and Netflix. Its ecosystem (Next.js, React Native) allows developers to build everything from static sites to mobile apps using the same skillset.",
        quiz: [
            { text: "What is the primary purpose of React?", options: ["Database Management", "Building User Interfaces", "Server-side routing", "Operating Systems"], correctIndex: 1 },
            { text: "What is the Virtual DOM?", options: ["A VR headset", "A lightweight copy of the actual DOM for performance", "A video game", "A database"], correctIndex: 1 },
            { text: "What syntax extension does React use to describe UI?", options: ["HTML", "XML", "JSX", "CSS"], correctIndex: 2 },
            { text: "Which hook is used to manage state in a function component?", options: ["useEffect", "useState", "useContext", "useReducer"], correctIndex: 1 },
            { text: "How is data passed from a parent to a child component?", options: ["State", "Props", "Global Variables", "Magic"], correctIndex: 1 },
            { text: "What company maintains React?", options: ["Google", "Amazon", "Meta (Facebook)", "Microsoft"], correctIndex: 2 }
        ]
    },
    javascript: {
        intro: "JavaScript is the programming language of the web. It enables interactive behavior on web pages and has evolved into a full-stack language capable of running servers, robots, and mobile apps.",
        historicalContext: "Created by Brendan Eich in 10 days in 1995, JavaScript was originally just for simple browser scripts. The advent of AJAX in the 2000s and Node.js in 2009 transformed it into the world's most widely used programming language.",
        technicalBreakdown: "Key features include:\n- **Asynchronous Programming**: Using Promises and async/await to handle tasks without freezing the interface.\n- **DOM Manipulation**: Changing HTML and CSS on the fly.\n- **ES6+ Features**: Modern syntax like arrow functions, destructuring, and modules.",
        modernImplications: "JavaScript is inescapable. It runs on every consumer device with a browser. From Netflix's interface to SpaceX's dashboard, JS is the glue of the modern digital interface.",
        quiz: [
            { text: "Which data type is NOT a primitive in JavaScript?", options: ["String", "Object", "Boolean", "Number"], correctIndex: 1 },
            { text: "What keyword is used to declare a block-scoped variable?", options: ["var", "let", "global", "int"], correctIndex: 1 },
            { text: "What does 'DOM' stand for?", options: ["Document Object Model", "Data Oriented Module", "Digital Ordinance Map", "Disk Operating Mode"], correctIndex: 0 },
            { text: "Which symbol is used for strict equality comparison?", options: ["==", "===", "=", "!=="], correctIndex: 1 },
            { text: "What is 'Node.js'?", options: ["A browser", "A JavaScript runtime built on Chrome's V8 engine", "A code editor", "A verified database"], correctIndex: 1 },
            { text: "How do you write a comment in JavaScript?", options: ["<!-- Comment -->", "// Comment", "# Comment", "** Comment"], correctIndex: 1 }
        ]
    },
    python: {
        intro: "Python is a high-level, general-purpose programming language known for its readability and versatility. It is the language of choice for data science, AI, and web backend development.",
        historicalContext: "Created by Guido van Rossum and released in 1991, Python's design philosophy emphasized code readability with its notable use of significant indentation. It gained massive popularity in the 2010s with the rise of Data Science.",
        technicalBreakdown: "Python shines in:\n- **Simplicity**: Code reads like English.\n- **Libraries**: Massive ecosystem (Pandas for data, PyTorch for AI, Django for web).\n- **Interpreted**: Code runs line-by-line, making debugging easier.",
        modernImplications: "Python powers the backend of Instagram, the recommendation algorithms of Spotify, and the AI models of OpenAI. It is arguably the most critical language for the future of technology.",
        quiz: [
            { text: "What is Python primarily known for?", options: ["Speed", "Readability and Simplicity", "Mobile Apps", "Low-level Memory Management"], correctIndex: 1 },
            { text: "Which character is used to comment in Python?", options: ["//", "#", "<!--", "*"], correctIndex: 1 },
            { text: "What defines a code block in Python?", options: ["Curly Braces {}", "Indentation", "Semicolons", "Keywords"], correctIndex: 1 },
            { text: "Which library is famous for data manipulation?", options: ["React", "Pandas", "Lodash", "JQuery"], correctIndex: 1 },
            { text: "Is Python compiled or interpreted?", options: ["Compiled", "Interpreted", "Both", "Neither"], correctIndex: 1 },
            { text: "What is a 'List' in Python equivalent to in other languages?", options: ["Dictionary", "Array", "String", "Object"], correctIndex: 1 }
        ]
    },
    physics: {
        intro: "Physics is the natural science that studies matter, its fundamental constituents, its motion and behavior through space and time, and the related entities of energy and force.",
        historicalContext: "From Newton's laws of motion to Einstein's theory of relativity and the bizarre world of quantum mechanics, physics has continuously expanded the boundaries of human comprehension of the universe.",
        technicalBreakdown: "Core pillars include:\n- **Classical Mechanics**: Motion of macroscopic objects.\n- **Thermodynamics**: Heat and energy transfer.\n- **Electromagnetism**: Electricity, magnetism, and light.\n- **Quantum Mechanics**: The behavior of particles at the atomic scale.",
        modernImplications: "Physics is the basis of engineering. Without it, we wouldn't have electricity, GPS (Relativity), computers (Semiconductors), or medical imaging (MRI).",
        quiz: [
            { text: "What is Newton's Second Law of Motion?", options: ["E=mc^2", "F=ma", "A body at rest stays at rest", "Action equals reaction"], correctIndex: 1 },
            { text: "What is the speed of light in a vacuum?", options: ["300,000 km/s", "100 km/h", "Speed of sound", "Infinite"], correctIndex: 0 },
            { text: "Who developed the Theory of General Relativity?", options: ["Isaac Newton", "Albert Einstein", "Tesla", "Galileo"], correctIndex: 1 },
            { text: "What particle is negatively charged?", options: ["Proton", "Neutron", "Electron", "Photon"], correctIndex: 2 },
            { text: "Which force holds the nucleus of an atom together?", options: ["Gravity", "Strong Nuclear Force", "Magnetism", "Weak Force"], correctIndex: 1 },
            { text: "What is the unit of energy?", options: ["Newton", "Joule", "Watt", "Volt"], correctIndex: 1 }
        ]
    },
    biology: {
        intro: "Biology is the study of life. It explores how living organisms function, evolve, and interact with their environment, from the smallest DNA strand to the largest ecosystems.",
        historicalContext: "The discovery of the cell structure in the 17th century and Darwin's Theory of Evolution in the 19th century laid the groundwork. The mapping of the Human Genome in 2003 opened the era of personalized medicine.",
        technicalBreakdown: "Key areas involve:\n- **Genetics**: Inheritance and DNA.\n- **Physiology**: How organs and systems work.\n- **Ecology**: Interactions between organisms.\n- **Microbiology**: study of microscopic organisms.",
        modernImplications: "CRISPR gene editing, mRNA vaccines, and synthetic biology are revolutionizing healthcare and agriculture, promising cures for genetic diseases and sustainable food sources.",
        quiz: [
            { text: "What is the 'powerhouse' of the cell?", options: ["Nucleus", "Mitochondria", "Ribosome", "Membrane"], correctIndex: 1 },
            { text: "What molecule stores genetic information?", options: ["Protein", "Carbohydrate", "DNA", "Lipid"], correctIndex: 2 },
            { text: "Who proposed the theory of Evolution by Natural Selection?", options: ["Lamark", "Charles Darwin", "Gregor Mendel", "Louis Pasteur"], correctIndex: 1 },
            { text: "What is the process by which plants make food?", options: ["Respiration", "Photosynthesis", "Fermentation", "Digestion"], correctIndex: 1 },
            { text: "Humans typically have how many pairs of chromosomes?", options: ["12", "46", "23", "100"], correctIndex: 2 },
            { text: "Which blood type is known as the universal donor?", options: ["AB+", "O-", "A+", "B-"], correctIndex: 1 }
        ]
    },
    business: {
        intro: "Business is the activity of making one's living or making money by producing or buying and selling products (such as goods and services). It is the engine of the global economy.",
        historicalContext: "From the barter systems of Mesopotamia to the joint-stock companies of the 17th century and the tech startups of Silicon Valley, business has evolved from simple trade to complex global networks.",
        technicalBreakdown: "Core functions include:\n- **Marketing**: Understanding and reaching customers.\n- **Finance**: Managing capital and risk.\n- **Operations**: Efficiently creating value.\n- **Strategy**: Long-term planning for competitive advantage.",
        modernImplications: "E-commerce, remote work, and AI automation are reshaping business models. The focus is shifting towards sustainability and social responsibility (ESG).",
        quiz: [
            { text: "What does 'ROI' stand for?", options: ["Rate of Interest", "Return on Investment", "Risk on Insurance", "Real Official Income"], correctIndex: 1 },
            { text: "Which document outlines a company's goals and strategy?", options: ["Invoice", "Business Plan", "Receipt", "Resume"], correctIndex: 1 },
            { text: "What is an 'IPO'?", options: ["Initial Public Offering", "International Price Option", "Internet Protocol Output", "Internal Product Order"], correctIndex: 0 },
            { text: "In marketing, what are the 4 Ps?", options: ["People, Place, Price, Product", "Product, Price, Place, Promotion", "Plan, Prepare, Push, Pull", "Profit, People, Power, Passion"], correctIndex: 1 },
            { text: "What is a 'Bear Market'?", options: ["Prices are rising", "Prices are falling", "A market for animals", "A stable market"], correctIndex: 1 },
            { text: "What is 'equity'?", options: ["Debt", "Ownership share in a company", "Employee salary", "Office rent"], correctIndex: 1 }
        ]
    }
};

// ------------------------------------------------------------------
// LUMINA UNIVERSAL KNOWLEDGE ENGINE (MOCK)
// ------------------------------------------------------------------

// TIER 2: Universal Dictionary (Lightweight facts for specific common topics)
const universalDictionary: Record<string, { summary: string; category: string; keyFact: string; quiz: Question[] }> = {
    // Technology
    "internet": {
        summary: "The Internet is a global system of interconnected computer networks that uses the Internet protocol suite (TCP/IP) to communicate between networks and devices.",
        category: "Technology",
        keyFact: "It originated from ARPANET in the 1960s.",
        quiz: [
            { id: 'q-univ-1', text: "What protocol does the Internet primarily use?", options: ["TCP/IP", "Bluetooth", "Sonar", "Morse Code"], correctIndex: 0 },
            { id: 'q-univ-2', text: "Which agency funded the precursor to the internet (ARPANET)?", options: ["NASA", "DARPA", "The UN", "Apple"], correctIndex: 1 }
        ]
    },
    "blockchain": {
        summary: "Blockchain is a distributed ledger technology that maintains a permanent and tamper-proof record of transactional data.",
        category: "Technology",
        keyFact: "It is the underlying technology of cryptocurrencies like Bitcoin.",
        quiz: [
            { id: 'q-univ-1', text: "What is the primary feature of a blockchain?", options: ["Centralization", "Decentralization & Immutability", "Speed", "Hidden Data"], correctIndex: 1 },
            { id: 'q-univ-2', text: "Blocks are linked together using:", options: ["Glue", "Cryptographic Hashes", "Hyperlinks", "Wires"], correctIndex: 1 }
        ]
    },
    // Nature
    "photosynthesis": {
        summary: "Photosynthesis is the process used by plants and other organisms to convert light energy into chemical energy that can later be released to fuel the organism's activities.",
        category: "Biology",
        keyFact: "It typically occurs in chloroplasts using the green pigment chlorophyll.",
        quiz: [
            { id: 'q-univ-1', text: "What is the primary input for photosynthesis?", options: ["Sugar", "Sunlight", "Oxygen", "Protein"], correctIndex: 1 },
            { id: 'q-univ-2', text: "What gas do plants release as a byproduct?", options: ["Carbon Dioxide", "Oxygen", "Methane", "Nitrogen"], correctIndex: 1 }
        ]
    },
    // People
    "einstein": {
        summary: "Albert Einstein was a German-born theoretical physicist, widely ranked among the greatest and most influential scientists of all time.",
        category: "Person",
        keyFact: "He developed the theory of relativity, one of the two pillars of modern physics.",
        quiz: [
            { id: 'q-univ-1', text: "What formula is Einstein most famous for?", options: ["F=ma", "E=mc^2", "a^2+b^2=c^2", "V=IR"], correctIndex: 1 },
            { id: 'q-univ-2', text: "What prize did he win in 1921?", options: ["Grammy", "Nobel Prize in Physics", "Pulitzer", "Oscar"], correctIndex: 1 }
        ]
    },
    // Concepts
    "democracy": {
        summary: "Democracy is a form of government in which the people have the authority to deliberate and decide legislation, or to choose governing officials to do so.",
        category: "Politics",
        keyFact: "It originated in Athens, Greece, in the 5th century BC.",
        quiz: [
            { id: 'q-univ-1', text: "What does the word 'Democracy' literally mean?", options: ["Rule by the King", "Rule by the People", "Rule by the Wealthy", "Rule by God"], correctIndex: 1 },
            { id: 'q-univ-2', text: "Which ancient city is credited with inventing democracy?", options: ["Rome", "Sparta", "Athens", "Cairo"], correctIndex: 2 }
        ]
    },
    "cryptocurrency": {
        summary: "A cryptocurrency is a digital currency designed to work as a medium of exchange through a computer network that is not reliant on any central authority.",
        category: "Finance",
        keyFact: "Bitcoin, released in 2009, was the first decentralized cryptocurrency.",
        quiz: [
            { id: 'q-univ-1', text: "Who created Bitcoin?", options: ["Elon Musk", "Satoshi Nakamoto", "Bill Gates", "Vitalik Buterin"], correctIndex: 1 },
            { id: 'q-univ-2', text: "What technology secures cryptocurrencies?", options: ["Blockchain", "Cloud Computing", "Firewalls", "Passwords"], correctIndex: 0 }
        ]
    }
};

// TIER 3: Heuristic Detector (Smart guessing for unknown topics)
const detectCategory = (topic: string): { type: string; template: any } => {
    const lower = topic.toLowerCase();

    // Heuristics
    if (lower.match(/person|who|king|queen|president|scientist|artist|writer|actor/)) return { type: 'Person', template: 'biography' };
    if (lower.match(/place|city|country|continent|river|mountain|ocean|planet/)) return { type: 'Place', template: 'location' };
    if (lower.match(/how to|guide|tutorial|learn|steps/)) return { type: 'Skill', template: 'tutorial' };
    if (lower.match(/theory|concept|idea|philosophy|ism/)) return { type: 'Concept', template: 'abstract' };

    // Default
    return { type: 'General', template: 'general' };
};

export const generateCourse = async (topic: string): Promise<Course> => {
    console.log('LUMINA AI: ARCHITECTING UNIVERSAL COURSE FOR:', topic);
    return new Promise((resolve) => {
        setTimeout(() => {
            const lowerTopic = topic.toLowerCase();
            const seed = Date.now();

            // 1. TIER 1 CHECK: Specialized Deep Content
            let specializedType = '';
            if (lowerTopic.match(/math|algebra|calculus|geometry/)) specializedType = 'math';
            else if (lowerTopic.match(/science|chem|astronomy|space/)) specializedType = 'science';
            else if (lowerTopic.match(/physics/)) specializedType = 'physics';
            else if (lowerTopic.match(/bio|biology|life/)) specializedType = 'biology';
            else if (lowerTopic.match(/history|war|ancient|century|era/)) specializedType = 'history';
            else if (lowerTopic.match(/lit|book|novel|poem|write/)) specializedType = 'literature';
            else if (lowerTopic.match(/art|paint|sculpt|draw|design|creative/)) specializedType = 'art';
            else if (lowerTopic.match(/business|market|finance|economy|entrepreneur/)) specializedType = 'business';
            else if (lowerTopic.match(/health|medical|wellness|nutrition|fitness/)) specializedType = 'health';
            else if (lowerTopic.match(/react|jsx|component|hook/)) specializedType = 'react';
            else if (lowerTopic.match(/python|snake|django|flask/)) specializedType = 'python';
            else if (lowerTopic.match(/javascript|js|node|express/)) specializedType = 'javascript';
            else if (lowerTopic.match(/code|program|computer|dev/)) specializedType = 'coding';
            else if (lowerTopic.match(/ai|intelligence|robot|learning|gpt/)) specializedType = 'ai';

            if (specializedType && specializedContent[specializedType]) {
                const content = specializedContent[specializedType];
                resolve({
                    id: `gen-tier1-${seed}`,
                    title: `Mastering ${topic.charAt(0).toUpperCase() + topic.slice(1)}`,
                    description: `A comprehensive deep-dive into ${topic}, designed for mastery.`,
                    progress: 0,
                    lessons: [
                        { id: `l1-${seed}`, title: 'Origins & Foundations', type: 'text', duration: '5 min', content: `# Module 1: Foundations\n\n${content.intro}\n\n## Historical Context\n${content.historicalContext}\n\n> "History is the best teacher."`, quiz: content.quiz.slice(0, 2).map((q, i) => ({ ...q, id: `q1-${i}` })) },
                        { id: `l2-${seed}`, title: 'Core Mechanics', type: 'text', duration: '8 min', content: `# Module 2: Mechanics\n\n${content.technicalBreakdown}\n\n## Analysis\nUnderstanding the components is crucial for application.`, quiz: content.quiz.slice(2, 4).map((q, i) => ({ ...q, id: `q2-${i}` })) },
                        { id: `l3-${seed}`, title: 'Future Horizons', type: 'interactive', duration: '6 min', content: `# Module 3: The Future\n\n${content.modernImplications}\n\n## Conclusion\nThe path forward requires constant adaptation.`, quiz: content.quiz.slice(4, 6).map((q, i) => ({ ...q, id: `q3-${i}` })) }
                    ]
                });
                return;
            }

            // 2. TIER 2 CHECK: Universal Dictionary (Exact match or partial match)
            // Look for keys in universalDictionary that are present in the user topic
            const dictKey = Object.keys(universalDictionary).find(k => lowerTopic.includes(k));
            if (dictKey) {
                const data = universalDictionary[dictKey];
                const properTitle = topic.charAt(0).toUpperCase() + topic.slice(1);
                resolve({
                    id: `gen-tier2-${seed}`,
                    title: `${properTitle}: ${data.category} Analysis`,
                    description: `An accelerated learning module focused on ${properTitle}.`,
                    progress: 0,
                    lessons: [
                        {
                            id: `l1-${seed}`, title: 'Core Definitions', type: 'text', duration: '3 min',
                            content: `# What is ${properTitle}?\n\n${data.summary}\n\n## Key Insight\n${data.keyFact}\n\n## Category\nThis falls under the domain of **${data.category}**.`,
                            quiz: data.quiz
                        },
                        {
                            id: `l2-${seed}`, title: 'Deep Dive', type: 'interactive', duration: '5 min',
                            content: `# Advanced Analysis\n\nWhen studying **${properTitle}**, it is important to consider its impact on the wider ${data.category} landscape.\n\n- **Relevance**: High\n- **Complexity**: Moderate\n\n> "Knowledge is power."`,
                            quiz: [
                                { id: 'q-gen-1', text: `True or False: ${properTitle} is related to ${data.category}?`, options: ["False", "True"], correctIndex: 1 }
                            ]
                        }
                    ]
                });
                return;
            }

            // 3. TIER 3 CHECK: Heuristic Fallback (The "Universal" Generator)
            // If we don't know it, we generate a valid, structured, semantic wrapper course.
            const heuristic = detectCategory(topic);
            const properTitle = topic.charAt(0).toUpperCase() + topic.slice(1);

            // Dynamic Question Generator based on Topic Name
            const dynamicQuiz: Question[] = [
                { id: 'dq1', text: `What is the primary method to understand ${topic}?`, options: ["Guessing", "Systematic Analysis", "Ignoring it", "Running away"], correctIndex: 1 },
                { id: 'dq2', text: `True or False: ${properTitle} requires dedicated study to master.`, options: ["False", "True"], correctIndex: 1 },
                { id: 'dq3', text: `Which of the following is crucial for ${topic}?`, options: ["Chaos", "Structure and Rules", "Silence", "Darkness"], correctIndex: 1 },
                { id: 'dq4', text: `How strictly should one follow the rules of ${topic}?`, options: ["Not at all", "Depending on context", "Rigidly", "Randomly"], correctIndex: 1 }
            ];

            resolve({
                id: `gen-tier3-${seed}`,
                title: heuristic.type === 'Person' ? `Biography: ${properTitle}` : `The Principles of ${properTitle}`,
                description: `A structured analysis of ${topic} and its fundamental principles.`,
                progress: 0,
                lessons: [
                    {
                        id: `l1-${seed}`,
                        title: 'Introduction & Context',
                        type: 'text',
                        duration: '4 min',
                        content: `
# Introduction to ${properTitle}

**${properTitle}** is a significant subject within the realm of **${heuristic.type}**. To understand it, we must first accept that it works according to a specific set of rules and logic.

## Why this matters
Grasping the fundamentals of **${topic}** allows you to navigate more complex related topics with ease. It is a building block of wider knowledge.

## Key Terminology
- **Concept**: The core idea.
- **Context**: Where it applies.
- **Application**: How it is used.
                        `,
                        quiz: dynamicQuiz.slice(0, 2)
                    },
                    {
                        id: `l2-${seed}`,
                        title: 'Operational Logic',
                        type: 'video',
                        duration: '6 min',
                        content: `
# How it Works

Every system, including **${topic}**, operates on input and output.
1.  **Input**: What is required to start the process?
2.  **Process**: The transformation or action.
3.  **Output**: The result or consequence.

By analyzing **${topic}** through this lens, we remove the mystery and reveal the mechanics.
                        `,
                        quiz: dynamicQuiz.slice(2, 4)
                    }
                ]
            });

        }, 1500);
    });
};

export const generateAdaptiveLesson = async (_currentLessonId: string, score: number, totalQuestions: number): Promise<Lesson> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const percentage = (score / totalQuestions) * 100;
            const seed = Date.now();

            if (percentage < 60) {
                // Remedial Lesson
                resolve({
                    id: `adaptive-${seed}`, title: 'Reinforcement Session', type: 'text', duration: '3 min',
                    content: `# Review Required\n\nIt seems we moved too fast. Let's revisit the core definitions.\n\n## Key Takeaway\nFocus on the fundamental definitions before moving to complex applications.`,
                    quiz: [{ id: 'q-rem', text: "What is the best way to improved understanding?", options: ["Speed", "Repetition and Analysis", "Giving up"], correctIndex: 1 }]
                });
            } else {
                resolve({
                    id: `adaptive-${seed}`, title: 'Advanced Application', type: 'interactive', duration: '5 min',
                    content: `# Advanced Application\n\nSince you have mastered the basics, consider how this applies in edge-cases.\n\n## Scenario\nImagine a situation where standard rules do not apply...`,
                    quiz: [{ id: 'q-adv', text: "In advanced scenarios, what becomes more important?", options: ["Rigid rules", "Adaptability", "Speed"], correctIndex: 1 }]
                });
            }
        }, 1500);
    });
};
