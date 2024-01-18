"use client";

import { SurveyDTO } from "@/types/SurveyDTO";
import { FormEventHandler, useMemo } from "react";

interface SurveyFormProps {
  title: string;
  defaultValues?: SurveyDTO["data"];
  updateSurvey: (formData: FormData) => void;
}

export default function SurveyForm(props: SurveyFormProps) {
  const defaultValues: Partial<SurveyDTO["data"]> = useMemo(() => {
    return props.defaultValues || {};
  }, [props]);

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">
          {props.title}
        </h3>
      </div>
      <form action={props.updateSurvey}>
        <div className="p-6.5">
          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <label
                className="mb-2.5 block text-black dark:text-white"
                htmlFor="name"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter the survey name"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                required
                defaultValue={defaultValues.name}
              />
            </div>

            <div className="w-full xl:w-1/2">
              <label
                className="mb-2.5 block text-black dark:text-white"
                htmlFor="manager"
              >
                Manager
              </label>
              <input
                id="manager"
                name="manager"
                type="email"
                placeholder="Enter your email"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                required
                defaultValue={defaultValues.manager}
              />
            </div>
          </div>

          <div className="mb-6">
            <label
              className="mb-2.5 block text-black dark:text-white"
              htmlFor="introduction"
            >
              Introduction Message
            </label>
            <textarea
              id="introduction"
              name="introduction"
              rows={6}
              placeholder="Type your introduction message"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              defaultValue={defaultValues.introduction!}
            ></textarea>
          </div>

          <div className="mb-4.5">
            <label
              className="mb-2.5 block text-black dark:text-white"
              htmlFor="status"
            >
              Status
            </label>
            <div className="relative z-20 bg-transparent dark:bg-form-input">
              <select
                className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                id="status"
                name="status"
                defaultValue={defaultValues.status}
              >
                <option value="DRAFT">Draft</option>
                <option value="ONGOING">Ongoing</option>
                <option value="FINISHED">Finished</option>
              </select>
              <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                <svg
                  className="fill-current"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g opacity="0.8">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                      fill=""
                    ></path>
                  </g>
                </svg>
              </span>
            </div>
          </div>

          <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray">
            Save Survey
          </button>
        </div>
      </form>
    </div>
  );
}
