import styles from "./Card.module.css";

const Card = ({ item }) => (
    <div>
        <img src={item.thumbnail.regular.small} alt={item.title + "preview"} />
        <p>{item.year}</p>
        <p>{item.category}</p>
        <p>{item.rating}</p>
        <h3>{item.title}</h3>
    </div>
);

export default Card;
