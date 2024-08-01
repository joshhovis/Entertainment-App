// animations/variants.js
const pageVariants = {
    hidden: {
        opacity: 0,
        transition: { duration: 0.25 },
    },
    show: {
        opacity: 1,
        transition: { duration: 0.25 },
    },
    exit: {
        opacity: 0,
        transition: { duration: 0.25 },
    },
};

const cardVariants = {
    hidden: {
        opacity: 0,
        transition: { duration: 0.2 },
    },
    show: {
        opacity: 1,
        transition: { duration: 0.2 },
    },
    exit: {
        opacity: 0,
        transition: { duration: 0.2 },
    },
};

export { pageVariants, cardVariants };
