import { useState } from "react";
import { nanoid } from "nanoid/non-secure";
import axios from "axios";
import { Link, createSearchParams } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

import Logo from "../components/Logo";
import Input from "../components/Input";
import Button from "../components/Button";
import ErrorCard from "../components/ErrorCard";

function NewRecord() {
  const lsSearch = localStorage.getItem("search");
  const search = lsSearch ? JSON.parse(lsSearch) : { q: "", order: "nasc" };

  const initialFormValues: { [key: string]: string } = {
    nameSurname: "",
    country: "",
    city: "",
    email: "",
    website: "",
  };
  const [formValues, setFormValues] = useState(initialFormValues);

  const [isDisabled, setisDisabled] = useState<boolean>(true);

  const [formErrors, setformErrors] = useState<(string | null)[]>([]);

  // Form validation after HTML validation and saving new record
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validating form fields
    const errors = Object.values(formValues).map((value, idx) =>
      validate(INPUTS[idx].label, value)
    );

    // State for displaying errors
    setformErrors(errors);

    if (errors.every((value) => value === null)) {
      const lsRecords = localStorage.getItem("records") || "[]";

      // Set submit button state to disabled while generating short url from website
      setisDisabled(true);

      const records = JSON.parse(lsRecords);

      const isExists = records.find(
        (record: { [key: string]: string }) => record.email === formValues.email
      );

      if (!isExists) {
        axios
          .get(`https://tinyurl.com/api-create.php?url=${formValues.website}`)
          .then((response) => {
            // Saving new record to local storage after trying to shorten website url
            const newRecord = {
              ...formValues,
              website: response.data || formValues.website,
              id: nanoid(),
              phone: "",
              company: "",
            };

            localStorage.setItem(
              "records",
              JSON.stringify([...records, newRecord])
            );
          })
          .catch((error) => console.log(error))
          .finally(() => setisDisabled(false));
      }
    }
  };

  const validate = (name: string, value: string) => {
    if (value.trim().length === 0) return `${name} field can't be empty!`;
    if (
      name === "Name Surname" &&
      !value.match("^[a-zA-Z\\sğüşöçıİĞÜŞÖÇ]{4,60}$")
    ) {
      return `Name Surname should be 4 - 60 characters long and shouldn't include any special characters!`;
    }
    if (name === "Country" || name === "City") {
      if (!value.match("^[a-zA-Z\\sğüşöçıİĞÜŞÖÇ]{2,40}$")) {
        return `${name} should be 2 - 40 characters long and shouldn't include any special characters!`;
      }
    }
    if (
      name === "Website" &&
      !value.match(
        "[Hh][Tt][Tt][Pp][Ss]?://(?:(?:[a-zA-Z\\u00a1-\\uffff0-9]+-?)*[a-zA-Z\\u00a1-\\uffff0-9]+)(?:.(?:[a-zA-Z\\u00a1-\\uffff0-9]+-?)*[a-zA-Z\\u00a1-\\uffff0-9]+)*(?:.(?:[a-zA-Z\\u00a1-\\uffff]{2,}))(?::d{2,5})?(?:/[^s]*)?"
      )
    ) {
      return "Website should be a URL!";
    }
    return null;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Update form values with new values
    setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    // Get each value of form values and update state for disabled button
    setisDisabled(Object.values(formValues).some((val) => val.length === 0));
  };

  // Input elements
  const INPUTS = [
    {
      id: "1",
      name: "nameSurname",
      label: "Name Surname",
      type: "text",
      errorMessage:
        "Name and Surname should be 4 - 60 characters long and shouldn't include any special characters!",
      placeholder: "Enter name and surname",
      pattern: "^[a-zA-Z\\sğüşöçıİĞÜŞÖÇ]{4,60}$",
    },
    {
      id: "2",
      name: "country",
      label: "Country",
      type: "text",
      errorMessage:
        "Country should be 2 - 40 characters long and shouldn't include any special characters!",
      placeholder: "Enter a country",
      pattern: "^[a-zA-Z\\sğüşöçıİĞÜŞÖÇ]{2,40}$",
    },
    {
      id: "3",
      name: "city",
      label: "City",
      type: "text",
      errorMessage:
        "City should be 2 - 40 characters long and shouldn't include any special characters!",
      placeholder: "Enter a city",
      pattern: "^[a-zA-Z\\sğüşöçıİĞÜŞÖÇ]{2,40}$",
    },
    {
      id: "4",
      name: "email",
      label: "Email",
      type: "email",
      errorMessage: "Email should be a valid email address!",
      placeholder: "Enter a email (abc@xyz.com)",
      pattern:
        "(?![_.-])((?![_.-][_.-])[a-zA-Z\\d_.-]){0,63}[a-zA-Z\\d]@((?!-)((?!--)[a-zA-Z\\d-]){0,63}[a-zA-Z\\d]\\.){1,2}([a-zA-Z]{2,14}\\.)?[a-zA-Z]{2,14}",
    },
    {
      id: "5",
      name: "website",
      label: "Website",
      type: "url",
      errorMessage: "Website should be a URL!",
      placeholder: "Enter a website (https://xyz.com)",
      pattern:
        "[Hh][Tt][Tt][Pp][Ss]?://(?:(?:[a-zA-Z\\u00a1-\\uffff0-9]+-?)*[a-zA-Z\\u00a1-\\uffff0-9]+)(?:.(?:[a-zA-Z\\u00a1-\\uffff0-9]+-?)*[a-zA-Z\\u00a1-\\uffff0-9]+)*(?:.(?:[a-zA-Z\\u00a1-\\uffff]{2,}))(?::d{2,5})?(?:/[^s]*)?",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto h-[80vh] mb-10">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:justify-start items-center p-10 gap-8">
        <Link to="/">
          <Logo className="w-[300px] md:w-[150px] mx-auto" />
        </Link>
        <Link
          to={{
            pathname: "/records",
            search: `?${createSearchParams({
              q: search.q,
              order: search.order,
            })}`,
          }}
          className="flex gap-3 text-xl font-bold hover:bg-gray-100 focus:bg-gray-100 active:bg-gray-200 p-2 transition-colors rounded-lg"
        >
          <ArrowLeftIcon className="w-8 aspect-square" />
          Return to Records Page
        </Link>
      </header>
      {/* Form */}
      <main>
        <form
          onSubmit={handleSubmit}
          className="max-w-[700px] mx-auto flex flex-col gap-5 px-3"
        >
          {INPUTS.map((input) => (
            <Input
              key={input.id}
              {...input}
              value={formValues[input.name]}
              onChange={handleChange}
            />
          ))}
          <Button type="submit" className="self-end" disabled={isDisabled}>
            Add
          </Button>
        </form>
      </main>
      <div className="absolute flex flex-col gap-2 bottom-2 right-2">
        {formErrors
          .filter((errors) => errors !== null)
          .map((err, idx) => (
            <ErrorCard
              key={idx}
              message={err as string}
              duration={3000}
              onClose={() => setformErrors([])}
            />
          ))}
      </div>
    </div>
  );
}

export default NewRecord;
