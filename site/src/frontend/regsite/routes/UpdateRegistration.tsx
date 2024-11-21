import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { MutableTeamRegistrationSchema } from "../../../../lib/api/contract";
import type {
  MutableTeamRegistration,
  TeamRegistration,
} from "../../../../lib/api/frontend_contract";

export default function UpdateRegistration({
  registration,
  values,
  message,
}: {
  registration: TeamRegistration;
  values: MutableTeamRegistration;
  message?: string;
}) {
  const {
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(MutableTeamRegistrationSchema),
    values,
  });

  console.log({ values, errors });

  return (
    <div>
      <h1>Update Registration</h1>
      {message && <p>{message}</p>}
      <p>
        Username: <strong>{registration.username}</strong>
      </p>
      <p>
        Password: <strong>{registration.password}</strong>
      </p>
      <form method="POST">
        <div>
          <label>
            Name:
            <input {...register("name")} defaultValue={values.name} />
          </label>
          {errors.name?.message && <p>{errors.name.message}</p>}
        </div>
        <div>
          <label>
            Team Email:
            <input {...register("teamEmail")} defaultValue={values.teamEmail} />
          </label>
          {errors.teamEmail?.message && <p>{errors.teamEmail.message}</p>}
        </div>
        <div>
          <label>
            Contact Name:
            <input
              {...register("contactName")}
              defaultValue={values.contactName}
            />
          </label>
          {errors.contactName?.message && <p>{errors.contactName.message}</p>}
        </div>
        <div>
          <label>
            Contact Pronouns:
            <input
              {...register("contactPronouns")}
              defaultValue={values.contactPronouns}
            />
          </label>
          {errors.contactPronouns?.message && (
            <p>{errors.contactPronouns.message}</p>
          )}
        </div>
        <div>
          <label>
            Contact Email:
            <input
              {...register("contactEmail")}
              defaultValue={values.contactEmail}
            />
          </label>
          {errors.contactEmail?.message && <p>{errors.contactEmail.message}</p>}
        </div>
        <div>
          <label>
            Contact Phone:
            <input
              {...register("contactPhone")}
              defaultValue={values.contactPhone}
            />
          </label>
          {errors.contactPhone?.message && <p>{errors.contactPhone.message}</p>}
        </div>
        <div>
          <label>
            Total Team Members:
            <input
              {...register("peopleTotal", { valueAsNumber: true })}
              defaultValue={values.peopleTotal}
            />
          </label>
          {errors.peopleTotal?.message && <p>{errors.peopleTotal.message}</p>}
        </div>
        <div>
          <label>
            Team Members On Campus:
            <input
              {...register("peopleOnCampus", { valueAsNumber: true })}
              defaultValue={values.peopleOnCampus}
            />
          </label>
          {errors.peopleOnCampus?.message && (
            <p>{errors.peopleOnCampus.message}</p>
          )}
        </div>
        <div>
          <label>
            Team Members Last Year:
            <input
              {...register("peopleLastYear", { valueAsNumber: true })}
              defaultValue={values.peopleLastYear}
            />
          </label>
          {errors.peopleLastYear?.message && (
            <p>{errors.peopleLastYear.message}</p>
          )}
        </div>
        <div>
          <label>
            Undergrad Student Team Members:
            <input
              {...register("peopleUndergrad", { valueAsNumber: true })}
              defaultValue={values.peopleUndergrad}
            />
          </label>
          {errors.peopleUndergrad?.message && (
            <p>{errors.peopleUndergrad.message}</p>
          )}
        </div>
        <div>
          <label>
            Graduate Student Team Members:
            <input
              {...register("peopleGrad", { valueAsNumber: true })}
              defaultValue={values.peopleGrad}
            />
          </label>
          {errors.peopleGrad?.message && <p>{errors.peopleGrad.message}</p>}
        </div>
        <div>
          <label>
            Alum Team Members:
            <input
              {...register("peopleAlum", { valueAsNumber: true })}
              defaultValue={values.peopleAlum}
            />
          </label>
          {errors.peopleAlum?.message && <p>{errors.peopleAlum.message}</p>}
        </div>
        <div>
          <label>
            MIT Staff Team Members:
            <input
              {...register("peopleStaff", { valueAsNumber: true })}
              defaultValue={values.peopleStaff}
            />
          </label>
          {errors.peopleStaff?.message && <p>{errors.peopleStaff.message}</p>}
        </div>
        <div>
          <label>
            Visitor Team Members:
            <input
              {...register("peopleVisitor", { valueAsNumber: true })}
              defaultValue={values.peopleVisitor}
            />
          </label>
          {errors.peopleVisitor?.message && (
            <p>{errors.peopleVisitor.message}</p>
          )}
        </div>
        <div>
          <label>
            Minor Team Members:
            <input
              {...register("peopleMinor", { valueAsNumber: true })}
              defaultValue={values.peopleMinor}
            />
          </label>
          {errors.peopleMinor?.message && <p>{errors.peopleMinor.message}</p>}
        </div>
        <input type="submit" />
      </form>
    </div>
  );
}
