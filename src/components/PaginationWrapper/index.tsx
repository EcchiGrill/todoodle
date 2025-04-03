"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationLink,
} from "@/components/ui/pagination";
import { useEffect, useState } from "react";

interface PaginationWrapperProps {
  totalPages: number;
  currentPage: number;
}

export default function PaginationWrapper({
  totalPages,
  currentPage,
}: PaginationWrapperProps) {
  const [visiblePages, setVisiblePages] = useState(7);

  useEffect(() => {
    const handleResize = () => {
      setVisiblePages(window.innerWidth > 640 ? 7 : 5);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const pages = Math.min(totalPages, visiblePages);

  return (
    <Pagination className="mt-5">
      <PaginationContent>
        {Array.from({ length: pages }, (_, i) => i + 1).map((pageNum) => (
          <PaginationLink
            key={pageNum}
            href={`/page/${pageNum}`}
            isActive={pageNum === currentPage}
            className="max-sm:text-sm max-sm:px-3"
          >
            {pageNum}
          </PaginationLink>
        ))}
      </PaginationContent>
      {totalPages > visiblePages && (
        <PaginationContent>
          <PaginationEllipsis />
        </PaginationContent>
      )}
    </Pagination>
  );
}
