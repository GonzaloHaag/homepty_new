import {
  BriefcaseBusinessIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
} from "lucide-react";
import { DialogEditUser } from "./dialog-edit-user";

import { ErrorMessage } from "../shared";
import { STATES_NAMES_BY_ID } from "@/utils/formatters";
import { QueryResponse, User } from "@/types";
interface Props {
  userPromise: Promise<QueryResponse<User>>;
}
export async function UserInfo({ userPromise }: Props) {
  const response = await userPromise;
  if (!response.ok || !response.data) {
    return <ErrorMessage message="Error al obtener el usuario." />;
  }
  const user = response.data;
  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-0">
          <h4 className="font-medium">{user.nombre_usuario ?? "Sin nombre"}</h4>
          <p>
            {user.descripcion_usuario === ""
              ? "Sin descripción"
              : user.descripcion_usuario}
          </p>
        </div>
        <DialogEditUser user={user} />
      </div>
      <div className="flex flex-col gap-y-2">
        <div className="flex items-center gap-x-2 text-sm">
          <MapPinIcon size={20} className="text-gray-500" />
          <span>
            {user.id_estado ? STATES_NAMES_BY_ID[user.id_estado] : "Sin estado"}
          </span>
        </div>
        <div className="flex items-center gap-x-2 text-sm">
          <PhoneIcon size={20} className="text-gray-500" />
          <span>{user.telefono_usuario ?? "Sin teléfono"}</span>
        </div>
        <div className="flex items-center gap-x-2 text-sm">
          <MailIcon size={20} className="text-gray-500" />
          <span>{user.email_usuario ?? "Sin correo electrónico"}</span>
        </div>
        <div className="flex items-center gap-x-2 text-sm">
          <BriefcaseBusinessIcon size={20} className="text-gray-500" />
          <span>{user.actividad_usuario ?? "Sin actividad"}</span>
        </div>
      </div>
    </div>
  );
}
