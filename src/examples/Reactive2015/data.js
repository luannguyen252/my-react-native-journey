module.exports = {
  workshop: [
    {
      time: "8:00 – 9:00",
      title: "DOORS OPEN & Registration",
    },
    {
      time: "9:00 – 16:00",
      title: "WORKSHOPS",
      speaker: "React technologies",
    },
  ],
  day1: [
    {
      time: "8:00 – 9:00",
      title: "DOORS OPEN & Registration",
    },
    {
      time: "9:00 – 9:15",
      title: "Conference opening",
    },
    {
      time: "9:15 – 9:45",
      title: "TBD",
      speaker: "James Long",
      company: "Mozilla",
      bio: "James Long works for Mozilla on the Firefox Developer Tools, mostly trying to make debugging JavaScript better. He's spent the last 8 years studying programming languages like Lisp and Scheme, and trying to bring various ideas to JavaScript. He likes to write in-depth articles about interesting programming ideas. Most of his free time is now happily dedicated to his daughter.",
      twitter: "http://twitter.com/jlongster",
      github: "http://github.com/jlongster",
      web: "https://jlongster.com/",
      category: "react_general",
      avatar: "https://reactive2015.com/assets/img/team/james_long.jpg",
    },
    {
      time: "9:45 – 10:45",
      title: "BIND TO THE CLOUD WITH FALCOR",
      speaker: "Paul Taylor",
      company: "Netflix",
      category: "rethinking_react",
      excerpt:
        "Imagine how easy building your web application would be if all of your data was available in-memory on the client. Falcor lets you to code that way.\n\nFalcor is the open-source, JS data access framework that powers Netflix. Falcor lets you represent all of your cloud data sources as one virtual JSON model on the server. On the client, Falcor makes it appear as if the entire JSON model is available locally and allows you to access data the same way you would from an in-memory JSON object. Falcor retrieves the model data you request from the cloud on-demand, transparently handling all the network communication and keeping the server and client in sync.\n\nFalcor is not a replacement for your MVC framework, your database, or your application server. Falcor fits seamlessly into your existing stack and lets the layers communicate more efficiently.\n\nGet an inside look at the innovative data platform that powers the Netflix UIs and the new UI design patterns it enables. Learn more how Falcor powers Netflix, and how you can integrate into your existing stack.",
      bio: "Paul Taylor is a consultant in San Francisco, CA, and former lead engineer on FalcorJS on Netflix’s UI Platform team. Paul specializes in functional programming and contributes to Reactive Extensions. When he’s not busy meeting client deadlines, he works on installations and procedurally generated visualizations for his partner’s techno performances, and plans to move to Berlin in the next few years.",
      twitter: "http://twitter.com/trxcllnt",
      github: "http://github.com/trxcllnt",
      avatar: "https://reactive2015.com/assets/img/team/paul_taylor.jpg",
    },
    {
      time: "10:45 – 11:15",
      title: "VICTORY.JS - A POWERFUL DATA VISUALIZATION LIBRARY FOR REACTJS",
      speaker: "Colin Megil",
      company: "Formidable Labs",
      category: "react_everywhere",
      excerpt:
        "We tried swapped out D3's DOM model in favor of React. The result? Love at first iteration. Building a data visualization library as React components means that you can reclaim your SVG as declarative markup, NPM install visualizations directly into your project (can't do that with bl.ocks!), fork them, remix them and file issues against them. It also meant completely rethinking how animations are done, since D3's animation model relies on its DOM model. Come learn the API, and what it means for the future of interactive data visualization.",
      bio: "Colin is founder of Seattle based startup pol.is as well as a Senior Front End Developer at Formidable Labs. He has architected and built client side applications for some of the largest brands in the world. A former educator, he also teaches regularly at multiple Fortune 10 companies and in the JavaScript community, most recently in a series of in depth talks on ReactJS given at Facebook Seattle. Colin's primary focus is user interface design, product design and information architecture. He has a passion for leveraging data visualization technologies and the mobile web to create novel and enduring information experiences. He lives in the Fremont neighborhood of Seattle with his wife Christie and two wonderful little boys.",
      twitter: "http://twitter.com/colinmegill",
      github: "http://github.com/colinmegill",
      avatar: "https://reactive2015.com/assets/img/team/colin_megill.jpg",
    },
    {
      time: "11:15 – 11:45",
      title: "Coffee Break",
    },
    {
      time: "11:45 – 12:15 ",
      title: "FUNCTIONAL PROGRAMMING IN JAVASCRIPT. WHAT, WHY, AND HOW.",
      speaker: "Daniel Steigerwald",
      company: "VacuumLabs",
      category: "data_flow",
      excerpt:
        "As programs get bigger, they also become more complex and harder to understand. We all think ourselves pretty clever, of course, but we are mere human beings, and even a moderate amount of chaos tends to baffle us. And then it all goes downhill. Working on something you do not really understand is a bit like cutting random wires on those time-activated bombs they always have in movies. If you are lucky, you might get the right one ― especially if you are the hero of the movie and strike a suitably dramatic pose ― but there is always the possibility of blowing everything up.",
      bio: "Creator of Este, dev stack and starter kit for React/Flux universal web applications. Angel developer, Google Developer Expert, libertarian.",
      twitter: "http://twitter.com/steida",
      github: "http://github.com/steida",
      web: "https://daniel.steigerwald.cz/",
      avatar: "https://reactive2015.com/assets/img/team/daniel_steigerwald.jpg",
    },
    {
      time: "12:15 – 13:00",
      title: "DECONSTRUCTING REACT",
      speaker: "Nikita Prokopov",
      company: "Datascript",
      category: "react_general",
      excerpt:
        "React is a framework and consist of many parts. I want to study these parts in isolation, identify their purpose, how they affect the way we write apps, and how else can we achieve same effect (alternative solutions). Parts are: VDOM, local state, components, elements, classes, id allocation, lifecycle callbacks, mixins, lazy dom and so on.",
      bio: "For the past ten years Nikita Prokopov has been building web interfaces, backends and distributed systems in Clojure, Erlang, Python, Java. Long-time blogger, UX enthusiast and Clojure evangelist from Novosibirsk, Russia.",
      twitter: "http://twitter.com/nikitonsky",
      github: "http://github.com/tonsky",
      web: "https://tonsky.me/",
      avatar: "https://reactive2015.com/assets/img/team/nikita_prokopov.jpg",
    },
    {
      time: "13:00 – 13:45",
      title: "THE CASE FOR CSS MODULES",
      speaker: "Mark Dalgleish",
      company: "SEEK",
      category: "react_general",
      excerpt:
        "With the push towards writing CSS in JavaScript within the React community, CSS Modules have suddenly emerged as a surprisingly popular alternative that still allow us to maintain our connection with the CSS community. Do we have to give up writing CSS in JavaScript? Are we clinging to the past, or do CSS Modules offer a new way forward for the entire web community? In this talk we'll examine both the history and potential future of CSS Modules, and hopefully inspire the next generation of styling in React.",
      bio: "Mark Dalgleish is the co-creator of CSS Modules, lead organiser of MelbJS and progressive enhancement enthusiast. Mark Dalgleish is a self-described JavaScript addict, co-creator of CSS Modules, lead organiser of MelbJS, and interaction craftsman at SEEK—the most popular job site in Australia. Having got his start with HTML and UI design at a young age, he has since developed a love of open source and software engineering, but always as a means to creating elegant, usable experiences.",
      twitter: "http://twitter.com/markdalgleish",
      github: "http://github.com/markdalgleish",
      web: "https://markdalgleish.com/",
      avatar: "https://reactive2015.com/assets/img/team/mark_dalgleish.jpg",
    },
    {
      time: "13:45 – 14:45",
      title: "Lunch Break",
    },
    {
      time: "14:45 – 15:15",
      title: "STATE, UI AND THE STUFF IN BETWEEN",
      speaker: "Christian Alfoni",
      category: "data_flow",
      excerpt:
        "The one way flow of flux has pushed us in the right direction, but we are still evolving what makes up that flow. Cerebral is a project that separates storing state and producing state with a functional flow defining API called signals.",
      bio: "Christian Alfoni likes to share ideas and build tools to make web development more fun than painful",
      twitter: "http://twitter.com/christianalfoni",
      github: "http://github.com/christianalfoni",
      web: "https://www.christianalfoni.com/",
      avatar: "https://reactive2015.com/assets/img/team/christian_alfoni.jpg",
    },
    {
      time: "15:15 – 15:45",
      title: "FRONT‐END CAN BE MORE FUNCTIONAL",
      speaker: "Julia Gao",
      category: "data_flow",
      excerpt:
        "Functional programming gives developers better ideas on how the application will react, more expected outputs, and less time needed for debugging. Immutability is one of the key points for functional programming, I'll show you some of the things we can improve on the front-end to make the code more immutable and functional.",
      bio: "Front-end developer from Utah, using ReactJS and ImmutableJS . Loves functional programming, currently learning Racket and Haskell.",
      twitter: "http://twitter.com/ryoia",
      github: "http://github.com/ryoia",
      avatar: "https://reactive2015.com/assets/img/team/julia_gao.jpg",
    },
    {
      time: "15:45 – 16:15",
      title: "TBD",
      speaker: "Victor Grishchenko",
      company: "Swarm.js",
      category: "rethinking_react",
      excerpt:
        'Let\'s zoom out of the reactive front-end story to see the big picture. How data and events propagate between clients and servers? What if clients are mobile and connections are intermittent? What about offline work? Can we cache our data? What if we need to act in real time? Welcome to the world of distributed mutable state, also known as ""hell"". Way too often, existing methods pretend that we act in a single point, at a single moment of time, alone (think ACID). One approach to truly asynchronous thinking is the math apparatus known as CRDT (Commutative/Convergent Replicated Data Types). I will tell how CRDT can be practically used to resolve some of the challenges mentioned.',
      bio: "Researching deep hypertext, distributed systems and the general information metabolism of the society.",
      twitter: "http://twitter.com/gritzko",
      github: "http://github.com/gritzko",
      avatar: "https://reactive2015.com/assets/img/team/victor_grishchenko.jpg",
    },
    {
      time: "16:15 – 16:45",
      title: "RXJS EVOLVED",
      speaker: "Paul Taylor",
      company: "Netflix",
      category: "data_flow",
      excerpt:
        "Reactive Extensions for JavaScript is evolving! Building on lessons learned from RxJava and RxMobile, Microsoft Netflix, Google, and the ReactiveX community have begun work on the next version of RxJS. This talk will enumerate the improvements we’ve made to increase speed, reduce memory, expose locations for extension, provide more debuggable call-stacks, and enable more readable flame charts.",
      bio: "Paul Taylor is a consultant in San Francisco, CA, and former lead engineer on FalcorJS on Netflix’s UI Platform team. Paul specializes in functional programming and contributes to Reactive Extensions. When he’s not busy meeting client deadlines, he works on installations and procedurally generated visualizations for his partner’s techno performances, and plans to move to Berlin in the next few years.",
      twitter: "http://twitter.com/trxcllnt",
      github: "http://github.com/trxcllnt",
      avatar: "https://reactive2015.com/assets/img/team/paul_taylor.jpg",
    },
    {
      time: "16:45 – 17:15",
      title: "Coffee Break",
    },
    {
      time: "17:15 – 17:45",
      title: "UNIVERSAL REACT + FLUX AT SCALE",
      speaker: "Rajiv Tirumalareddy",
      company: "Yahoo",
      category: "data_flow",
      excerpt:
        "React is great and Flux is awesome. Running both on the server and client is even better! You've built your app with the latest and greatest tech stack, but will your app scale to millions of users? We created and open sourced Fluxible and other libraries that support Yahoo's high-traffic web applications. I'll share our learnings and go through best practices, performance concerns, and challenges of building robust and scalable web applications.",
      bio: "Rajiv is software engineer at Yahoo working on node.js and Fluxible (Universal Flux and React) frontends that power high-traffic web applications.",
      twitter: "http://twitter.com/rajivontherocks",
      github: "http://github.com/Vijar",
      avatar:
        "https://reactive2015.com/assets/img/team/rajiv_tirumalareddy.jpg",
    },
    {
      time: "17:45 – 18:30",
      title: "INTEGRATING REACT WITH REACTIVE DATABASES",
      speaker: "Tomas Kulich",
      company: "VacuumLabs",
      category: "rethinking_react",
      excerpt:
        "React is a great tool for synchronizing data with views on the client side. However, to achieve perfect real-time experience one also needs to synchronize server data with client data. Unfortunately the nowadays widely used REST-like API is rather suited to one-time fetches, usually resulting in stale client data. Reactive databases such as Firebase seek to be the solution to this problem. I will show how Firebase can be integrated with React (spoiler alert: it can be done in a beautiful way) to get what-you-see-is-what-it-really-is kind of UX and how the FLUX pattern helps us to keep database updates clean. Since Firebase-like databases are quite fresh and immature, you may get an inspiration for a nice Friday-night project here.",
      bio: "Tomas is a former university assistant professor at the Faculty of Informatics, Comenius University, Bratislava. Helped dozens of students with their thesis. Extensive interdisciplinary research in artifical inteligence, biology and physics. He found his passion as the founder and CTO of VacuumLabs.",
      twitter: "http://twitter.com/tomas_kulich",
      github: "http://github.com/tomaskulich",
      avatar: "https://reactive2015.com/assets/img/team/tomas_kulich.jpg",
    },
    {
      time: "18:30 – 19:30",
      title: "LIGHTNING TALKS",
      speaker: "Speakers announced soon",
    },
    {
      time: "19:30",
      title: "Door Closing",
    },
  ],

  day2: [
    {
      time: "8:30–9:00",
      title: "Doors Open",
    },
    {
      time: "9:00–9:30",
      title:
        "REACT, TRANSPARENT REACTIVE PROGRAMMING AND MUTABLE DATA STRUCTURES",
      speaker: "Michel Weststrate",
      company: "Mendix",
      category: "data_flow",
      excerpt:
        "The ability to express essential complexity in a simple way is crucial for any code-base. At Mendix we did an interesting discovery during the development of a complex MDD tool. React, mutable data structures and transparent reactive programming are a match made in heaven. We published a library that leverages these concepts; Mobservable. It helps you to write simple, declarative, yet highly efficient code. Your future code maintainers will love you for applying it.",
      bio: "Michel is a full-stack lead developer at Mendix. A company that drives digital innovation in large enterprises in partnership with companies like HP, Capgemini and Pivotal. Michel strongly believes in pragrammatic programming; YANGI, agile, the-simplest-thing-that-could-possibly-work. As author of Mobservable he tries to bring reactiveness to the world of React in a way that is accessible for any developer.",
      twitter: "http://twitter.com/mweststrate",
      github: "http://github.com/mweststrate",
      web: "http://medium.com/@mweststrate",
      avatar: "https://reactive2015.com/assets/img/team/michel_weststrate.jpg",
    },
    {
      time: "9:30–10:00",
      title: "TBD",
      speaker: "Mike Grabowski",
      company: "Man+Moon",
      category: "react_everywhere",
      excerpt:
        "The web is evolving out of the browser. With the rise of React Native for iOS, and the recently open sourced Android version, universal javascript is now about fully featured experiences across web, mobile devices and soon, it will be also about smart watches, TVs and beyond. Device fragmentation is about to explode and the need for write-once and run-everywhere is stronger than ever. The ability to maintain a single codebase of components and logic is currently a convenience but soon will be a necessity to keep up with the plethora of devices that our services will be accessed through. This talk explores these concepts and discusses the foundations of a developing a device-agnostic platform. By checking out various patterns and deployment techniques we are going to see how you can power all your devices by Javascript with confidence. Yes, even your washing machine!",
      bio: "Mike is a Full-Stack Developer at Man+Moon bringing real-time experience to thousands of people with a help of Javascript. Involved in React.js community for past few months, Mike recently jumped in onto the Este.js bandwagon where he helps maintaining the most complete React/Flux dev stack. As well as contributing to other node-based projects such as Keystone, he is also a NodeSchool mentor helping other people get started with Node.js platform. In his free time, apart from reading books and exploring today's new javascript framework, he plays guitar and tries to make it up to his girlfriend for all the time spent on the Internet.",
      twitter: "http://twitter.com/grabbou",
      github: "http://github.com/grabbou",
      avatar: "https://reactive2015.com/assets/img/team/mike_grabowski.jpg",
    },
    {
      time: "10:00–10:45",
      title: "TBD",
      speaker: "Guillermo Rauch",
      company: "LearnBoost, Automattic",
      category: "react_general",
      bio: "Guillermo Rauch is the former CTO and co-founder of LearnBoost and Cloudup, acquired by WordPress.com in 2013. His background and expertise is in the realtime web. He's the creator of socket.io, the most popular OSS realtime framework and one of the most popular JavaScript projects on GitHub, with implementations in many different programming languages (currently running the backend of high profile apps like Microsoft Office online). He also created MongooseJS, one of the most popular MongoDB clients. He's the author of \"Smashing Node.JS\" published by Wiley in 2012, best-selling book about Node.JS on Amazon in multiple programming categories.",
      twitter: "http://twitter.com/rauchg",
      github: "http://github.com/rauchg",
      web: "https://rauchg.com/",
      avatar: "https://reactive2015.com/assets/img/team/guillermo_rauch.jpg",
    },
    {
      time: "10:45–11:15",
      title: "Coffee Break",
    },
    {
      time: "11:15–11:45",
      title: "D3 WITH REACT",
      speaker: "Andreas Savvides",
      company: "Twitter",
      category: "react_everywhere",
      excerpt:
        "d3 has been the de facto standard when it comes to data visualisations for a while now and React has recently emerged as the go-to library for building user interfaces. d3 and React are both data-centric libraries, making them a natural fit; d3 takes a data-driven approach and React aims to solve the problem of data changing over time in the context of building large applications. There have been various approaches documented on how to effectively use d3 and React together. In this talk, I will be going through a number of these approaches, talking about what I have learned from them and how I go about creating reusable chart components for large scale applications.",
      bio: "Andreas is a full-stack, product-driven Software Engineer who enjoys building interactive single page applications with rich data visualisations. He is currently engineering things at Twitter and enjoys working on and contributing to open source projects such as d3act for using d3 with React and Radium for better inline style management in React apps. In his spare time, Andreas helps female graduates to learn to code as a Mentor/Lead Instructor for Code First: Girls.",
      twitter: "http://twitter.com/andrs",
      github: "http://github.com/AnSavvides",
      web: "https://ansavvides.github.io/",
      avatar: "https://reactive2015.com/assets/img/team/andreas_savvides.jpg",
    },
    {
      time: "11:45–12:15",
      title: "WORK AND PLAY IN THE REACT NATIVE PLAYGROUND",
      speaker: "Joshua Sierles",
      company: "Independent",
      category: "react_everywhere",
      excerpt:
        "If you’re like me, coming from web development, you find traditional mobile development slow and difficult to learn hands-on without a lot of guesswork, headaches and patience. Above all, things just move slower. The React Native Playground breaks down barriers to mobile development by making it speedy and trivial to write and test React Native code across platforms and devices. I want to share my experience working with an amazing team on this free resource. First, I'll give a quick tour of what's possible with the Playground, showing off some of React Native itself. We’ll see how React Native’s unique architecture made this project possible, revealing some interesting details of its inner workings. For example, how we're serving React Native javascript code over the web, and how we can load an application from inside another one. Finally, I want to briefly discuss how working on project like this, which help developers learn faster, can be fun, rewarding and an antidote to programmer fatigue.",
      bio: "Joshua is Co-creator of the React Native Playground and Rails/DevOps guy. Plays flamenco guitar in Sevilla, Spain, while working on a React Native development platform.",
      twitter: "http://twitter.com/jsierles",
      github: "http://github.com/jsierles",
      web: "http://rnplay.org/",
      avatar: "https://reactive2015.com/assets/img/team/joshua_sierles.jpg",
    },
    {
      time: "12:15–13:15",
      title: "EFFECTS AS DATA",
      speaker: "Richard Feldman",
      company: "NoRedInk",
      category: "data_flow",
      excerpt:
        "Imagine a world without side effects, where the only way to make things happen was to call functions whose return values described what you wanted done. What gets easier in that world? What gets harder? What would that mean for debugging? Testing? We don't have to wonder about these things, because this world already exists — and it compiles to JavaScript. It's the world of Elm, where there are no side effects, all functions are stateless, and all data is immutable. Elm embraces the concepts that make reactive programming great, and goes one step further to shed the error‐prone mutations and side effects that so often lead to incidental complexity and buggy code. NoRedInk has reaped the benefits of this approach since they began using Elm in production earlier in 2015. It's helped them scale and maintain a complex front-end code base that students use to answer millions of questions per day. Come see how refreshing this world can be!",
      bio: "Richard is the creator of seamless-immutable and Dreamwriter, and coauthor of Developing a React Edge. Richard leads the front-end team at NoRedInk, where he introduced React, then Flux, and now Elm to their production stack.",
      twitter: "http://twitter.com/rtfeldman",
      github: "http://github.com/rtfeldman",
      avatar: "https://reactive2015.com/assets/img/team/richard_feldman.jpg",
    },
    {
      time: "13:15–14:15",
      title: "Lunch Break",
    },
    {
      time: "14:15–14:45",
      title: "GOING REACTIVE WITH REACT.",
      speaker: "François de Campredon",
      company: "Fadio IT",
      category: "data_flow",
      excerpt:
        'In the past two years, React and all the related projects completely changed our way of creating application by breaking all the rules and forcing us to redefine what we thought being "best practice". However, there is still an area that has not changed much : how we define the relationship between user input and application state. In this talk, I\'ll try to demonstrate that we can express this relationship in a simpler and more declarative way by using techniques from reactive programing and by combining React with RxJS.',
      bio: 'Full-stack developer and co-founder of Fadio IT. For the past 10 years, I have been building web and mobile applications.JavaScript lover, creator of rx-react, my main focus is to create robust and elegant architectures and to make react more "reactive"',
      twitter: "http://twitter.com/Fdecampredon",
      github: "http://github.com/fdecampredon/",
      avatar:
        "https://reactive2015.com/assets/img/team/francois_de_campredon.jpg",
    },
    {
      time: "14:45–15:15",
      title: "FORM VALIDATION MADE SIMPLE WITH REACT",
      speaker: "Marcela Hrda",
      company: "VacuumLabs",
      category: "react_general",
      excerpt:
        "Creating validated forms is usually a troublesome experience. Most libraries used for building forms are complex and difficult to customize. As React plays nicely with functional approach, it can be easily used to create library for creating forms that is: a) simple and easy to understand b) customizable and extensible c) providing top user experience. I will present such library for building validated forms.",
      bio: "Marcela is a Quantum Physicist turned React developer. Studied at Caltech, returned to Slovakia to be closer to family. In her spare time, she is the MD of the most famous NGO aimed at supporting talented students, Trojsten.sk. One of the founders of VacuumLabs, loves React, thinks functional, is generally very happy.",
      github: "http://github.com/marcelka",
      avatar: "https://reactive2015.com/assets/img/team/marcelka_hrda.jpg",
    },
    {
      time: "15:15–15:45",
      title:
        "FROM REACT WEB TO NATIVE MOBILE: MAPPING OUT THE UNKNOWN UNKNOWNS",
      speaker: "Brent Vatne",
      company: "Independent",
      category: "react_everywhere",
      excerpt:
        "Engineers with experience using React for web coming who dive into mobile will feel at home quickly because the basic React API doesn't change. But building for mobile introduces a different way of thinking about the software that you create and React Native empowers you to embrace this rather than attempt to hide it from you: your primary mode of interaction is touch, animations are more common and are expected to be smooth and dynamically track your gestures, you actually have to think about how your app will handle offline / poor connectivity, what happens when the user backgrounds it and comes back, how to send push/local notifications and respond to them, how to stay at 60fps performance on a much less capable device with more demanding users, responding to the keyboard appearing and hiding - specifying different keyboard types, autocorrect/autocomplete, dealing with device orientation changes and status bar changes, app store deployment delays and more. I won't go into great detail about each of these points but will rather help you to build a mental map of the space and touch on solutions that React Native provides to handle these mobile-specific problems, in order for unknown unknowns can become known unknowns. So this talk is kind of to React Native what a maphack is to Starcraft, but totally not lame like that.",
      bio: "Lives in Vancouver and work primarily with Exponent and Iodine on React Native and BrentQL projects. With the rest of my time, I am a core contributor to React Native itself, I send out the React Native Newsletter each week and I try to go for long runs whenever I can.",
      twitter: "http://twitter.com/notbrent",
      github: "http://github.com/brentvatne",
      avatar: "https://reactive2015.com/assets/img/team/brent_vatne.jpg",
    },
    {
      time: "15:45–16:15",
      title: "TBD",
      speaker: "Martin Koníček",
      company: "Facebook",
      category: "react_everywhere",
      bio: "Works on React Native, specifically the Android part, at Facebook London. I am very excited to see what we'll build together now that React Native is open source on iOS and Android.",
      twitter: "http://twitter.com/martinkonicek",
      github: "http://github.com/mkonicek",
      avatar: "https://reactive2015.com/assets/img/team/martin_konicek.jpg",
    },
    {
      time: "16:15–16:45",
      title: "Coffee Break",
    },
    {
      time: "16:45–17:15",
      title: "DATO — A FUNCTIONAL WAY TO BUILD REACTIVE APPLICATIONS",
      speaker: "Sean Grove",
      company: "Bushido",
      category: "rethinking_react",
      excerpt:
        "Dato is a new way of building applications, heavily inspired by Meteor/Firebase/Relay, but informed by functional, data-oriented programming techniques. The goal is to provide:\nSeamless, permission-aware data synching between the sever and n-clients\nSeamless, permission-aware rpc invocations\nA more flexible, intuitive UI layer\nAdvanced tooling layer for time-traveling debuggers, state serialization, component layout, query editing, performance optimizations, and others.\nIntegration on the backend to stream into analytics, session replay, 3rd-party integration.",
      bio: "Sean's been convinced there are better ways to develop applications across the stack for years, and built time-traveling debuggers, interface builders, layout tools, and graphic design tools in his quest to explore the space.",
      twitter: "http://twitter.com/sgrove",
      github: "http://github.com/sgrove",
      avatar: "https://reactive2015.com/assets/img/team/sean_grove.jpg",
    },
    {
      time: "17:15–18:00",
      title: "CYCLE.JS AND FUNCTIONAL REACTIVE USER INTERFACES",
      speaker: "Andre Staltz",
      company: "Futurice",
      category: "data_flow",
      excerpt:
        "React's future is going to be more functional, and less OOP. What if that future is already reality? How would it look like? React's foundations are reactive rendering and UI as a pure function of state. These two foundations are reactive programming and functional programming, yet React has a lot of concepts from imperative programming. In this talk we will discover how Cycle.js is purely reactive and functional, and why it's an interesting alternative to React.",
      bio: "Andre is a user interface engineer at Futurice, with extensive knowledge in reactive programming. He is a contributor to RxJS, has built RxMarbles, written an introduction to reactive programming which went viral, and collaborated to design ReactiveX.io. His current mission is to redefine how we understand and structure user interfaces with the reactive web framework Cycle.js.",
      twitter: "http://twitter.com/andrestaltz",
      github: "http://github.com/staltz",
      web: "https://staltz.com/",
      avatar: "https://reactive2015.com/assets/img/team/andre_staltz.jpg",
    },
    {
      time: "18:00–18:30",
      title: "TBD",
      speaker: "Daniel Hengeveld",
      company: "Github",
      category: "react_everywhere",
      bio: "Daniel works at github",
      twitter: "http://twitter.com/thedaniel",
      github: "http://github.com/thedaniel",
      avatar: "https://reactive2015.com/assets/img/team/daniel_hengeveld.jpg",
    },
    {
      time: "18:30–19:00",
      title: "Closing ceremony",
    },
    {
      time: "19:00",
      title: "Door Closing",
    },
  ],
};
