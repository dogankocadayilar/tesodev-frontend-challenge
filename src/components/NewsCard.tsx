import { Link } from "react-router-dom";
import image from "../assets/newsImg.png";

function NewsCard() {
  return (
    <Link
      to="#"
      className="flex-shrink-0 flex-grow-0 md:w-[400px] px-2 md:px-0 w-full md:mr-[20px] md:last-of-type:mr-0 xl:mr-[40px] xl:[&:nth-of-type(3n)]:mr-0"
    >
      <img src={image} alt="News Image" className="w-full object-contain" />
      <h3 className="font-bold text-lg">
        A Plan to Rebuild the Bus Terminal Everyone Loves to Hate
      </h3>
      <p>1h ago · by Troy Corlson</p>
    </Link>
  );
}

export default NewsCard;
