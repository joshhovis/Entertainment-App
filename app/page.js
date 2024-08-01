// import Content from "@/components/Content";

// export default function Home() {
//     return <Content type="home" />;
// }
"use client";
import Content from "@/components/Content";
import { motion } from "framer-motion";
import { pageVariants } from "../animations/variants";

export default function Home() {
    return (
        <motion.main
            className="home"
            initial="hidden"
            animate="show"
            exit="exit"
            variants={pageVariants}
        >
            <Content type="home" />
        </motion.main>
    );
}
