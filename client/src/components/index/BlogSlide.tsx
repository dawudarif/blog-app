import moment from "moment";
import { IBlogItem } from "../../types/types";
import { Link } from "react-router-dom";

export default function BlogSlide({ item }: { item: IBlogItem }) {
  return (
    <Link
      to={`/blog/${item.id}`}
      className="border-[.375rem] border-transparent sm:hover:border-stone-100 rounded-lg flex sm:flex-col gap-4 cursor-pointer transition w-full hover:scale-[1.02] duration-300 h-full sm:p-2"
    >
      <div className="w-[50%] sm:w-full">
        <img
          src={item.cover}
          alt={item.title}
          className="h-full sm:h-60 w-full object-cover"
        />
      </div>
      <div className="flex-col flex gap-4 w-[50%] xs:w-full sm:w-full">
        <div>
          <div className="text-sm font-semibold text-[#6941C6]">
            <span>{moment(item.createdAt).format("MMMM Do, YYYY")}</span>
            <span className="text-xl font-extrabold mx-2">.</span>
            <span className="capitalize">{item.account.name}</span>
          </div>
          <h1 className="text-[1.2rem] font-bold capitalize line-clamp-3">
            {item.title}
          </h1>
          <h2 className="text-[1rem] italic font-base capitalize">
            {item.summary}
          </h2>
        </div>
      </div>
    </Link>
  );
}
