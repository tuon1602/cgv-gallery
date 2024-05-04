"use client";

import React, { ChangeEvent, useCallback, useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import _debounce from "lodash/debounce";
import axios from "axios";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ISearchResult } from "@/types";

const UserSearch = () => {
  const [value, setValue] = useState<string>("");
  const [searchData, setSearchData] = useState<ISearchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [divFocus, setDivFocus] = useState(false);
  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  function handleDebounceFn(inputValue: string) {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/search`, {
        params: {
          q: inputValue,
        },
      })
      .then((res) => {
        setSearchData(res.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const debounceFn = useCallback(_debounce(handleDebounceFn, 500), []);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    event.preventDefault();
    setValue(event.target.value);
    debounceFn(event.target.value);
  };
  const handleResetInput = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setValue("");
  };

  return (
    <div className="relative flex flex-1">
      <Input
        value={value}
        type="text"
        placeholder="Search"
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="rounded-none focus-visible:ring-0 focus-visible:focus-visible:ring-0"
      />
      {value.length > 0 ? (
        <button onClick={handleResetInput}>
          <X className="absolute w-5 h-5 right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground cursor-pointer" />
        </button>
      ) : (
        <Search className="absolute w-5 h-5 right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
      )}
      <div
        className={cn(
          "absolute min-h-[500px] border border-input bg-background rounded-sm z-[99] w-full top-[100%] border-t-0 rounded-t-none ",
          isFocused ? "block" : "hidden",
          value.length === 0 && "hidden"
        )}
      >
        <div className="absolute inset-0 flex justify-center items-center">
          {loading &&
            searchData?.status != 200 &&
            searchData?.message != "Success" && (
              <div className="flex justify-center items-center">loading...</div>
            )}
          {loading === false &&
            searchData?.result?.images.length === 0 &&
            searchData?.result?.users.length === 0 && (
              <div>no result found</div>
            )}
        </div>
        {loading === false &&
          (searchData?.result?.images.length != 0 ||
            searchData?.result?.users.length != 0) && (
            <>
              <div className="p-3 flex flex-col gap-5">
                <div className="text-center border-b border-b-input w-full pb-3">
                  Users
                </div>
                {searchData?.result?.users.map((user, index) => (
                  <>
                    <div className="flex items-center gap-5">
                      <Avatar>
                        <AvatarImage src={user.avatarUrl} alt={user.name} />
                        <AvatarFallback>{user.name}</AvatarFallback>
                      </Avatar>
                      <div className="text-sm">
                        <p>{user.name}</p>
                        <p className="text-gray-500">{user.userId}</p>
                      </div>
                    </div>
                  </>
                ))}
              </div>
              <div className="p-3 flex flex-col gap-5">
                <div className="text-center border-b border-b-input w-full pb-3">
                  Images
                </div>
                {searchData?.result?.images.map((image, index) => (
                  <>
                    <div className="flex items-center gap-2">
                      <Image
                        src={image.imageUrl[0]}
                        alt={image.title}
                        width={100}
                        height={100}
                        className="object-cover w-15 h-14 rounded-sm"
                      />
                      <div className="flex flex-col gap-1">
                        <p className="text-sm">Title: {image.title}</p>
                        <p className="text-sm text-gray-500">
                          {image.createdBy.name} ({image.createdBy.userId})
                        </p>
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </>
          )}
      </div>
    </div>
  );
};

export default UserSearch;
