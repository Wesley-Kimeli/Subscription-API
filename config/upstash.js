import { Client as WorkflowClient } from '@upstash/workflow';

import { QSTASH_TOKEN, QSTART_URL} from "./env.js";

export const workflowClient = new WorkflowClient({
    baseUrl: QSTART_URL,
    token: QSTASH_TOKEN,
});