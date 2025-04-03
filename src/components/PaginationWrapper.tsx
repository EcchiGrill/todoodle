"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationLink,
} from "@/components/ui/pagination";
import { useEffect, useState } from "react";
import { IPaginationWrapperProps } from "./PaginationWrapper/PaginationWrapper.props";
import { MAX_MOBILE_PAGINATION, MAX_PAGINATION } from "@/constants";

export default function PaginationWrapper({
  totalPages,
  currentPage,
}: IPaginationWrapperProps) {
  const [visiblePages, setVisiblePages] = useState(MAX_PAGINATION);

  useEffect(() => {
    const handleResize = () => {
      setVisiblePages(
        window.innerWidth > 640 ? MAX_PAGINATION : MAX_MOBILE_PAGINATION
      );
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
