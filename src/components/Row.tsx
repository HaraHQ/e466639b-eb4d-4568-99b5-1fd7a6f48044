"use client";
import useClickOutside from "@/hooks/useClickOutside";
import { FC, useRef, useState } from "react";
import { PiExclamationMarkDuotone, PiSpinner } from "react-icons/pi";
import { User } from "@/app/page";
import { useMutation } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";

interface UpdatedFields {
  [key: string]: {
    firstName?: string;
    lastName?: string;
    position?: string;
    phone?: string;
    email?: string;
  };
}

interface RowErrors {
  firstName: boolean;
  lastName: boolean;
  position: boolean;
  phone: boolean;
  email: boolean;
}

interface RowProps {
  index: string;
  updatedFields: UpdatedFields;
  setUpdatedFields: React.Dispatch<React.SetStateAction<any>>;
  checkRow: (index: string) => string;
  handleReset: () => void;
  resetRef: React.RefObject<HTMLDivElement>;
  data: User;
  refetch: () => Promise<void>;
}

const Row: FC<RowProps> = ({
  index,
  updatedFields,
  setUpdatedFields,
  checkRow,
  handleReset,
  resetRef,
  data,
  refetch
}) => {
  const [errors, setErrors] = useState<RowErrors>({
    firstName: false,
    lastName: false,
    position: false,
    phone: false,
    email: false
  });
  const resetError = () => {
    setErrors({
      firstName: false,
      lastName: false,
      position: false,
      phone: false,
      email: false
    });
  }
  const refresh = () => {
    if (firstNameREF_.current) {
      firstNameREF_.current.value = data.firstName;
    }
    if (lastNameREF.current) {
      lastNameREF.current.value = data.lastName;
    }
    if (positionREF.current) {
      positionREF.current.value = data.position;
    }
    if (phoneREF.current) {
      phoneREF.current.value = data.phone;
    }
    if (emailREF.current) {
      emailREF.current.value = data.email;
    }
  }
  const mutateFirstName = useMutation({
    mutationKey: ["firstName", data.id],
    mutationFn: (value: string) =>
      fetch("http://localhost:4000/crud", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: data.id,
          firstName: value,
        }),
      }).then(res => res.json()),
    onSettled: async (data) => {
      await refetch()
      setUpdatedFields({})
      if (data?.statusCode === 400) {
        setErrors((state) => ({
          ...errors,
          firstName: true
        }));
        refresh();
        return;
      }
      resetError();
      return;
    },
    onError: () => {
      refresh();
    }
  });
  const mutateLastName = useMutation({
    mutationKey: ["lastName", data.id],
    mutationFn: (value: string) =>
      fetch("http://localhost:4000/crud", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: data.id,
          lastName: value,
        }),
      }).then(res => res.json()),
    onSettled: async (data) => {
      await refetch()
      setUpdatedFields({})
      if (data?.statusCode === 400) {
        setErrors((state) => ({
          ...errors,
          lastName: true
        }));
        refresh();
        return;
      }
      resetError();
      return;
    },
    onError: () => {
      refresh();
    }
  });
  const mutatePosition = useMutation({
    mutationKey: ["position", data.id],
    mutationFn: (value: string) =>
      fetch("http://localhost:4000/crud", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: data.id,
          position: value,
        }),
      }).then(res => res.json()),
    onSettled: async (data) => {
      await refetch()
      setUpdatedFields({})
      if (data?.statusCode === 400) {
        setErrors((state) => ({
          ...errors,
          position: true
        }));
        refresh();
        return;
      }
      resetError();
      return;
    },
    onError: () => {
      refresh();
    }
  });
  const mutatePhone = useMutation({
    mutationKey: ["phone", data.id],
    mutationFn: (value: string) =>
      fetch("http://localhost:4000/crud", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: data.id,
          phone: value,
        }),
      }).then(res => res.json()),
    onSettled: async (data) => {
      await refetch()
      setUpdatedFields({})
      if (data?.statusCode === 400) {
        setErrors((state) => ({
          ...errors,
          phone: true
        }));
        refresh();
        return;
      }
      resetError();
      return;
    },
    onError: () => {
      refresh();
    }
  });
  const mutateEmail = useMutation({
    mutationKey: ["email", data.id],
    mutationFn: (value: string) =>
      fetch("http://localhost:4000/crud", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: data.id,
          email: value,
        }),
      }).then(res => res.json()),
    onSettled: async (data) => {
      await refetch()
      setUpdatedFields({})
      if (data?.statusCode === 400) {
        setErrors((state) => ({
          ...errors,
          email: true
        }));
        refresh();
        return;
      }
      resetError();
      return;
    },
    onError: () => {
      refresh();
    }
  });

  const handleUpdateFirstName = () => {
    if (updatedFields[index]?.firstName) {
      return mutateFirstName.mutate(updatedFields[index]?.firstName);
    }
  };
  const handleUpdateLastName = () => {
    if (updatedFields[index]?.lastName) {
      return mutateLastName.mutate(updatedFields[index]?.lastName);
    }
  };
  const handleUpdatePosition = () => {
    if (updatedFields[index]?.position) {
      return mutatePosition.mutate(updatedFields[index]?.position);
    }
  };
  const handleUpdatePhone = () => {
    if (updatedFields[index]?.phone) {
      return mutatePhone.mutate(updatedFields[index]?.phone);
    }
  };
  const handleUpdateEmail = () => {
    if (updatedFields[index]?.email) {
      return mutateEmail.mutate(updatedFields[index]?.email);
    }
  };

  const firstNameREF_ = useRef<HTMLInputElement>(null);
  const firstNameREF = useClickOutside<HTMLInputElement>(
    handleUpdateFirstName,
    handleReset,
    resetRef,
    firstNameREF_
  );
  const lastNameREF_ = useRef<HTMLInputElement>(null);
  const lastNameREF = useClickOutside<HTMLInputElement>(
    handleUpdateLastName,
    handleReset,
    resetRef,
    lastNameREF_
  );
  const positionREF_ = useRef<HTMLInputElement>(null);
  const positionREF = useClickOutside<HTMLInputElement>(
    handleUpdatePosition,
    handleReset,
    resetRef,
    positionREF_
  );
  const phoneREF_ = useRef<HTMLInputElement>(null);
  const phoneREF = useClickOutside<HTMLInputElement>(
    handleUpdatePhone,
    handleReset,
    resetRef,
    phoneREF_
  );
  const emailREF_ = useRef<HTMLInputElement>(null);
  const emailREF = useClickOutside<HTMLInputElement>(
    handleUpdateEmail,
    handleReset,
    resetRef,
    emailREF_
  );

  return (
    <div
      className={`col-span-5 grid grid-cols-5 ${checkRow(
        index
      )} border-neutral-500/50`}
    >
      <div className="w-full h-full relative">
        <input
          type="text"
          ref={firstNameREF}
          data-id={'firstName'}
          defaultValue={data.firstName}
          onChange={(e) =>
            setUpdatedFields((state: any) => ({
              ...state,
              [index]: {
                ...state[index],
                firstName: e.target.value,
              },
            }))
          }
          className={`w-full h-full border-b-2 outline-none border-transparent focus:border-b-blue-500 p-2 ${
            !!updatedFields[index]?.firstName && "bg-green-100"
          }`}
        />
        {mutateFirstName.isPending && <PiSpinner className="right-4 top-2.5 text-lg absolute animate-spin " />}
      </div>
      <div className="w-full h-full relative">
        <input
          type="text"
          ref={lastNameREF}
          data-id={'lastName'}
          defaultValue={data.lastName}
          onChange={(e) =>
            setUpdatedFields((state: any) => ({
              ...state,
              [index]: {
                ...state[index],
                lastName: e.target.value,
              },
            }))
          }
          className={`w-full h-full border-b-2 outline-none border-transparent focus:border-b-blue-500 p-2 ${
            !!updatedFields[index]?.lastName && "bg-green-100"
          }`}
        />
        {mutateLastName.isPending && <PiSpinner className="right-4 top-2.5 text-lg absolute animate-spin " />}
      </div>
      <div className="w-full h-full relative">
        <input
          type="text"
          ref={positionREF}
          data-id={'position'}
          defaultValue={data.position}
          onChange={(e) =>
            setUpdatedFields((state: any) => ({
              ...state,
              [index]: {
                ...state[index],
                position: e.target.value,
              },
            }))
          }
          className={`w-full h-full border-b-2 outline-none border-transparent focus:border-b-blue-500 p-2 ${
            !!updatedFields[index]?.position && "bg-green-100"
          }`}
        />
        {mutatePosition.isPending && <PiSpinner className="right-4 top-2.5 text-lg absolute animate-spin " />}
      </div>
      <div className="w-full h-full relative">
        <input
          type="text"
          ref={phoneREF}
          data-id={'phone'}
          defaultValue={data.phone}
          onChange={(e) =>
            setUpdatedFields((state: any) => ({
              ...state,
              [index]: {
                ...state[index],
                phone: e.target.value,
              },
            }))
          }
          className={`w-full h-full border-b-2 outline-none border-transparent focus:border-b-blue-500 p-2 ${
            !!updatedFields[index]?.phone && "bg-green-100"
          }`}
        />
        {mutatePhone.isPending && <PiSpinner className="right-4 top-2.5 text-lg absolute animate-spin " />}
      </div>
      <div className="w-full h-full relative">
        <input
          type="email"
          ref={emailREF}
          data-id={'email'}
          defaultValue={data.email}
          onChange={(e) =>
            setUpdatedFields((state: any) => ({
              ...state,
              [index]: {
                ...state[index],
                email: e.target.value,
              },
            }))
          }
          className={`w-full h-full border-b-2 outline-none border-transparent focus:border-b-blue-500 p-2 ${
            !!updatedFields[index]?.email && "bg-green-100"
          } ${errors.email && "bg-red-100"}`}
        />
        {mutateEmail.isPending && <PiSpinner className="right-4 top-2.5 text-lg absolute animate-spin " />}
        <AnimatePresence>
          {errors.email && (
            <motion.div
              onClick={() => setErrors((state) => ({ ...state, email: false }))}
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
    </div>
  );
};

export default Row;
