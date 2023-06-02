import React from 'react';
import {createRoot} from 'react-dom/client';
import {App} from './App';
// import * as AbsintheSocket from '@absinthe/socket';
// import {createAbsintheSocketLink} from '@absinthe/socket-apollo-link';
// import {Socket as PhoenixSocket} from 'phoenix';
// import {hasSubscription} from '@jumpn/utils-graphql';
// import {split} from 'apollo-link';
// import {RetryLink} from 'apollo-link-retry';
// import {createHttpLink} from 'apollo-link-http';

export const isBrowser = () => typeof window !== 'undefined' && !!window;

// let socket;
// let channel;

// if (isBrowser()) {
//   socket = new PhoenixSocket(process.env.REACT_APP_PHOENIX_SOCKET, {
//     params: {},
//     // logger: (kind: any, msg: any, data: any) =>
//     //   console.log('--', kind, msg, data)
//   });
//   channel = socket.channel('embed', {});
//   (window as any).embedChannel = channel;
// }

// const httpLink = createHttpLink({
//   uri: process.env.REACT_APP_GRAPHQL_SERVER,
// });

// const retryLink = new RetryLink();

// const retryingHttpLink = retryLink.concat(httpLink);

// let link = retryingHttpLink;

// if (isBrowser()) {
//   // Wrap the Phoenix socket in an AbsintheSocket.
//   const absintheSocket = AbsintheSocket.create(socket);

//   // Create an Apollo link from the AbsintheSocket instance.
//   const websocketLink = createAbsintheSocketLink(absintheSocket);

//   // If the query contains a subscription, send it through the
//   // websocket link. Otherwise, send it through the HTTP link.
//   link = split((operation) => hasSubscription(operation.query), websocketLink, httpLink);
// }

const w: any = window;

w.appRevision = process.env.REACT_APP_APP_REVISION;

const container = document.getElementById('app');
const root = createRoot(container!);
root.render(<App />);

// if (isBrowser()) {
//   channel.join();
//   socket.connect();
// }
