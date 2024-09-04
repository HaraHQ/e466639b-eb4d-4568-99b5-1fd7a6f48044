"use client";
import {
  PiArrowBendUpLeft,
  PiArrowUpBold,
  PiExclamationMarkDuotone,
  PiFloppyDiskBackBold,
  PiPlusBold,
  PiSpinner,
} from "react-icons/pi";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import useClickOutside from "@/hooks/useClickOutside";
import Row from "@/components/Row";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";

const headers = [
  { key: "firstName", value: "First Name" },
  { key: "lastName", value: "Last Name" },
  { key: "position", value: "Position" },
  { key: "phone", value: "Phone" },
  { key: "email", value: "Email" },
];

export interface User {
  firstName: string;
  lastName: string;
  position: string;
  phone: string;
  email: string;
  id?: string;
}

export default function Home() {
  const [sortBy, setSortBy] = useState<string>("");
  const [isAdd, setIsAdd] = useState<boolean>(false);
  const [updatedFields, setUpdatedFields] = useState<any>({});
  const [error, setError] = useState<boolean>(false);
  const {
    register,
    reset,
    watch,
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      position: "",
      phone: "",
      email: ""
    },
  });

  const resetButtonRef = useRef<HTMLDivElement>(null);

  const firstName = watch("firstName");
  const lastName = watch("lastName");
  const position = watch("position");
  const phone = watch("phone");
  const email = watch("email");

  const checkRow = (index: string) => {
    if (isAdd) {
      return "";
    } else {
      return "border-b";
    }
  };

  const checkEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const testEmail = emailRegex.test(email);

    if (testEmail) {
      return "bg-green-100";
    }
    return "bg-red-100";
  };

  const handleAdd = () => {
    if (isAdd) {
      setIsAdd(false);
      reset();
    } else {
      setIsAdd(true);
    }
  };

  const handleSort = (key: string) => {
    if (sortBy === key) {
      setSortBy("");
    } else {
      setSortBy(key);
    }
  };

  const create = useMutation({
    mutationKey: ["create"],
    mutationFn: async (data: User) => {
      const response = await fetch('http://localhost:4000/crud', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        const errorData = await response.json();

        if (errorData.statusCode === 400) {
          setError(true);
          console.log(errorData);
        }

        throw new Error(errorData.message || 'Something went wrong');
      }
  
      return response.json();
    },
    onSuccess: () => {
      users.refetch();
      setIsAdd(false);
      reset();
    },
    onError: (error: any) => {
      console.log(error.response)
    },
  });

  const handleSaveAdd = () => {
    if (create.isPending) return;

    if (
      firstName !== "" &&
      lastName !== "" &&
      position !== "" &&
      phone !== "" &&
      email !== ""
    ) {
      const payload = {
        firstName: firstName,
        lastName: lastName,
        position: position,
        phone: phone,
        email: email,
      };

      create.mutate(payload);
    }
  };

  const handleReset = async () => {
    reset();
    setIsAdd(false);
    setUpdatedFields({});
    await users.refetch();
  };

  const users = useQuery({
    queryKey: ["users", sortBy],
    queryFn: () => fetch(`http://localhost:4000/crud${sortBy !== "" ? `?sort=${sortBy}` : ''}`).then((res) => res.json()),
  });

  const ref = useClickOutside<HTMLDivElement>(handleSaveAdd, handleReset, resetButtonRef);

  return (
    <main
      className={`bg-white w-full h-screen overflow-hidden flex flex-col gap-4 p-8`}
    >
      <div className="w-full flex justify-end">
        <div className="flex gap-4 items-center">
          <PiPlusBold
            className="text-2xl cursor-pointer hover:text-blue-600"
            onClick={() => handleAdd()}
          />
          <PiFloppyDiskBackBold className="text-2xl cursor-pointer hover:text-red-600" onClick={() => handleSaveAdd()} />
          <div ref={resetButtonRef} onClick={() => handleReset()}>
            <PiArrowBendUpLeft
              className="text-2xl cursor-pointer hover:text-amber-600"
            />
          </div>
        </div>
      </div>
      <div
        className={`w-full grid grid-cols-5 border border-neutral-500/50 shadow-md`}
      >
        {headers.map((header) => (
          <div
            key={header.key}
            onClick={() => handleSort(header.key)}
            className="flex gap-1 items-center p-2 border-b bg-rose-200 border-neutral-500/50 text-neutral-800 cursor-pointer select-none hover:bg-rose-300 transition-all"
          >
            <span className="font-semibold">{header.value}</span>
            {sortBy === header.key && <PiArrowUpBold />}
          </div>
        ))}

        <AnimatePresence>
          {isAdd && (
            <motion.div
              initial={{ y: -5, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -5, opacity: 0 }}
              transition={{ duration: 0.2 }}
              ref={ref}
              className="col-span-5 grid grid-cols-5 border-b border-neutral-500/50"
            >
              <input
                type="text"
                {...register("firstName")}
                autoFocus={true}
                className={`w-full h-full border-b-2 outline-none border-transparent focus:border-b-blue-500 p-2 ${
                  firstName !== "" && "bg-green-100"
                }`}
              />
              <input
                type="text"
                {...register("lastName")}
                className={`w-full h-full border-b-2 outline-none border-transparent focus:border-b-blue-500 p-2 ${
                  lastName !== "" && "bg-green-100"
                }`}
              />
              <input
                type="text"
                {...register("position")}
                className={`w-full h-full border-b-2 outline-none border-transparent focus:border-b-blue-500 p-2 ${
                  position !== "" && "bg-green-100"
                }`}
              />
              <input
                type="text"
                {...register("phone")}
                className={`w-full h-full border-b-2 outline-none border-transparent focus:border-b-blue-500 p-2 ${
                  phone !== "" && "bg-green-100"
                }`}
              />
              <div className="w-full h-full relative">
                <input
                  type="email"
                  {...register("email")}
                  className={`w-full h-full outline-none border-b-2 border-transparent group focus:border-b-blue-500 p-2 ${
                    email !== "" && checkEmail(email)
                  }`}
                />
                {create.isPending && <PiSpinner className="right-4 top-2.5 text-lg absolute animate-spin " />}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      onClick={() => setError(false)}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute -bottom-8 z-20 text-xs bg-rose-600 text-white rounded-lg py-2 px-3 flex items-center gap-1 select-none cursor-pointer">
                      <PiExclamationMarkDuotone className="text-lg" />
                      <span>Email should unique</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {users.isLoading && (
          <div className="col-span-5 h-[80vh] flex justify-center items-center">
            <div className="flex flex-col w-60 items-center">
              <div className="w-full text-center">
                Loading...
              </div>
            </div>
          </div>
        )}

        {!users.isLoading && !users.data.length && (
          <div className="col-span-5 h-[80vh] flex justify-center items-center">
            <div className="flex flex-col w-60 items-center">
              <div className="w-full text-center">
                No Data...
              </div>
              <div className="w-full flex justify-center">
                <div
                  onClick={() => handleAdd()}
                  className="p-2 bg-rose-500 text-white text-sm flex items-center gap-1 select-none cursor-pointer rounded">
                  <PiPlusBold className="text-lg" />
                  <span>Add Data</span>
                </div>
              </div>
            </div>
          </div>
        )}


        <div className="col-span-5 grid grid-cols-5 overflow-y-scroll max-h-[80vh]">
          {!users.isLoading && users?.data.map((user: User) => (
            <Row
              data={user}
              index={user.id as string}
              checkRow={checkRow}
              setUpdatedFields={setUpdatedFields}
              updatedFields={updatedFields}
              handleReset={handleReset}
              resetRef={resetButtonRef}
              refetch={async () => {
                await users.refetch();
                setUpdatedFields({});
              }}
              key={user.id}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
