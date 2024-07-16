import { FC } from "react";

type Call = any;
type ApiAccessCheckerProps = any;
declare function fetchData(c: Call): Promise<string>;

async function ApiCheckerAccess2({
  caption,
  session,
}: Readonly<ApiAccessCheckerProps>) {
  // ...
}

declare function loadUser(): Promise<string>;
declare function loadCompany(): Promise<number>;

const ApiAccessChecker = async ({
  caption,
  session,
}: Readonly<ApiAccessCheckerProps>) => {
  const apiCalls: Call[] = [
    { method: "GET", uri: "/public" },
    // {method: "GET", uri: "/public", status: "OK" },
    { method: "GET", uri: "/admin" },
    { method: "PUT", uri: "/user" },
    { method: "POST", uri: "/phone" },
  ];

  const response = await Promise.all([loadUser(), loadCompany()]);

  const result = await Promise.all(
    apiCalls.map(async (call) => {
      call.status = await fetchData(call);
    }),
  );

  // const result = await Promise.all([
  // 	fetchData("..."),
  // 	fetchData("..."),
  // 	fetchData("..."),
  // ])

  // ja
  // 	apiCalls[0].status = await fetchData (apiCalls[0])
  // 	apiCalls[1].status = await fetchData (apiCalls[1])
  for (const call of apiCalls) {
    call.status = await fetchData(call);
  }
  // nein
  apiCalls.forEach(async (call) => (call.status = await fetchData(call)));
};

// ....
