import { useDebounce } from "@/shared/hooks/useDebounce";
import { useParamsHook } from "@/shared/hooks/useParamsHook";
import { Input } from "antd";
import React, { useEffect, useState, type ChangeEvent } from "react";
import { useLocation } from "react-router-dom";

const { Search } = Input;

const allowedFirstPaths = ["customer", "seller", "product"];
const allowedSecondPaths = ["active", "archive", "disabled"];

const SearchSection = () => {
  const { pathname } = useLocation();
  const {setParam, removeParam, getParam} = useParamsHook()
  const search = getParam("search") || ""
  const [value, setValue] = useState<string>(search);
  const firstPath = pathname.split("/")[1] || "customer";
  const secondPath = pathname.split("/")[2] || "active";
  const debouncedValue = useDebounce(value, 500)

  useEffect(()=>{
    if(debouncedValue){
        setParam("search", debouncedValue)
    }else{
        removeParam("search")
    }
  }, [debouncedValue])

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  return (
    <>
      {allowedFirstPaths.includes(firstPath) &&
      allowedSecondPaths.includes(secondPath) ? (
        <Search
          value={value}
          placeholder="Mijoz qidirish..."
          onChange={handleSearch}
          style={{ width: 400 }}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default React.memo(SearchSection);
