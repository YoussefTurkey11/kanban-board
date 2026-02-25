"use client";
import { Field } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { setSearch } from "@/redux/slices/uiSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { SearchIcon } from "lucide-react";

export function Searchbar() {
  const dispatch = useAppDispatch();
  const search = useAppSelector((state: RootState) => state.uiSlice.search);

  return (
    <Field className="max-w-sm">
      <InputGroup>
        <InputGroupInput
          id="inline-start-input"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => dispatch(setSearch(e.target.value))}
        />
        <InputGroupAddon align="inline-start">
          <SearchIcon className="text-muted-foreground" />
        </InputGroupAddon>
      </InputGroup>
    </Field>
  );
}
