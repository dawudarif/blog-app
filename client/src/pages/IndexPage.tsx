import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import BlogSlide from "../components/index/BlogSlide";
import BlogSlideLoader from "../components/loaders/BlogSlideLoader";
import { Button } from "../components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "../components/ui/pagination";
import { IBlogItem } from "../types/types";

export default function IndexPage() {
  const [pageNo, setPageNo] = useState(1);
  const [totalPages, setTotalPages] = useState<null | number>(null);
  const [data, setData] = useState<IBlogItem[]>([]);
  const [loading, setLoading] = useState(false);

  async function getBlogPosts(input?: any) {
    setLoading(true);

    try {
      let page = 1;

      if (totalPages === page) return;

      if (totalPages) {
        if (input === 1) {
          page = pageNo + 1;
        } else if (input === -1) {
          page = pageNo - 1;
        } else if (input === "last") {
          page = totalPages;
        }
      } else {
        page = pageNo;
      }

      setPageNo(page);

      const response = await axios.get(`/blog/get`, {
        params: { page },
        withCredentials: true,
      });
      setData(response.data.posts);
      setTotalPages(response.data.pages);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getBlogPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="max-w-screen-xxl lg:px-10 px-5 mx-auto w-full">
      <h1 className="text-[4.375rem] sm:text-[6.25rem] md:text-[9.375rem] lg:text-[12.5rem] xl:text-[15.1875rem] uppercase font-bold mt-[1.25rem] text-center border-b-4 border-b-stone-100">
        Blogger
      </h1>

      <h4 className="text-2xl font-semibold text-brand-text-black mt-10 w-fit px-5">
        Recent Blog Posts
      </h4>

      <div className="grid w-full grid-flow-row sm:grid-cols-2 md:grid-cols-3 grid-cols-1 justify-center items-center pt-4 gap-4">
        {loading ? (
          <>
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i: number) => (
              <BlogSlideLoader key={i} />
            ))}
          </>
        ) : (
          <>
            {data.map((item: IBlogItem) => (
              <BlogSlide key={item.id} item={item} />
            ))}
          </>
        )}
      </div>
      <Pagination className="py-4 flex items-center justify-center">
        <PaginationContent>
          <PaginationItem className="cursor-pointer text-lg sm:text-base xs:text-base">
            <Button disabled={pageNo === 1} onClick={() => getBlogPosts(-1)}>
              <ChevronLeft size={20} />
            </Button>
          </PaginationItem>
          <PaginationItem className="cursor-pointer">
            <PaginationLink className="text-xl sm:text-base xs:text-base underline">
              {pageNo}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem onClick={() => getBlogPosts("last")}>
            <PaginationEllipsis className="cursor-pointer text-xl" />
          </PaginationItem>
          <PaginationItem className="cursor-pointer text-lg sm:text-base xs:text-base">
            <Button
              disabled={pageNo === totalPages}
              onClick={() => getBlogPosts(1)}
            >
              <ChevronRight size={20} />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
