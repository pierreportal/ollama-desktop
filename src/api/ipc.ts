import { invoke } from "@tauri-apps/api/core";

export async function ipc_invoke(
  method: string,
  data: any,
): Promise<any> {
  console.log('data: ', data)
  const response: any = await invoke(method, data);
  console.log(response)
  if (response.error != null) {
    console.error(response.error);
    throw new Error(response.error);
  } else {
    return response.result;
  }
}

// function deepFreeze<T>(obj: T): T {
//   if (Object.isFrozen(obj)) return obj;

//   // Retrieve the property names defined on object
//   const propNames = Object.getOwnPropertyNames(obj);

//   // Freeze properties before freezing self

//   for (const name of propNames) {
//     const value = (<any>obj)[name];

//     if (value != null && typeof value === "object") {
//       deepFreeze(value);
//     }
//   }

//   return Object.freeze(obj);
// }