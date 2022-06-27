import Graph from "./Graph"
import {render, screen, waitFor} from "@testing-library/react"
import {Position} from "react-flow-renderer";

global.ResizeObserver = require('resize-observer-polyfill')

describe("Graph screen test", () => {

    const data = {
        "vertices": [{
            "id": "input",
            "data": {"label": "input", "source": {"generator": {"rpu": 250, "duration": "1s", "msgSize": 8}}},
            "position": {"x": 86.00022929179097, "y": 104},
            "type": "input",
            "style": {"background": "#D6D5E6", "color": "#333", "border": "1px solid #222138"},
            "targetPosition": Position.Left,
            "sourcePosition": Position.Right
        }, {
            "id": "preproc",
            "data": {"label": "preproc", "udf": {"container": null, "builtin": {"name": "cat"}}},
            "position": {"x": 308.0009479912802, "y": 104},
            "targetPosition": Position.Left,
            "sourcePosition": Position.Right
        }, {
            "id": "train",
            "data": {"label": "train", "udf": {"container": null, "builtin": {"name": "cat"}}},
            "position": {"x": 752.0003643437127, "y": 18},
            "targetPosition": Position.Left,
            "sourcePosition": Position.Right
        }, {
            "id": "train-1",
            "data": {"label": "train-1", "udf": {"container": null, "builtin": {"name": "cat"}}},
            "position": {"x": 974.0005434138947, "y": 18},
            "targetPosition": Position.Left,
            "sourcePosition": Position.Right
        }, {
            "id": "infer",
            "data": {"label": "infer", "udf": {"container": null, "builtin": {"name": "cat"}}},
            "position": {"x": 530.0006491028594, "y": 104},
            "targetPosition": Position.Left,
            "sourcePosition": Position.Right
        }, {
            "id": "postproc",
            "data": {"label": "postproc", "udf": {"container": null, "builtin": {"name": "cat"}}},
            "position": {"x": 752.0008060721026, "y": 147},
            "targetPosition": Position.Left,
            "sourcePosition": Position.Right
        }, {
            "id": "log-output",
            "data": {"label": "log-output", "sink": {"log": {}}},
            "position": {"x": 974.0001823872657, "y": 104},
            "type": "output",
            "style": {"background": "#D6D5E6", "color": "#333", "border": "1px solid #222138"},
            "targetPosition": Position.Left,
            "sourcePosition": Position.Right
        }, {
            "id": "train-output",
            "data": {"label": "train-output", "sink": {"log": {}}},
            "position": {"x": 1196.0000658161566, "y": 18},
            "type": "output",
            "style": {"background": "#D6D5E6", "color": "#333", "border": "1px solid #222138"},
            "targetPosition": Position.Left,
            "sourcePosition": Position.Right
        }, {
            "id": "publisher",
            "data": {"label": "publisher", "sink": {"log": {}}},
            "position": {"x": 974.0002039119054, "y": 190},
            "type": "output",
            "style": {"background": "#D6D5E6", "color": "#333", "border": "1px solid #222138"},
            "targetPosition": Position.Left,
            "sourcePosition": Position.Right
        }],
        "edges": [{
            "id": "input-preproc",
            "label": "0",
            "source": "input",
            "target": "preproc",
            "data": {
                "pipeline": "simple-pipeline",
                "fromVertex": "input",
                "toVertex": "preproc",
                "bufferName": "dataflow-system-simple-pipeline-postproc-publisher",
                "pendingCount": 0,
                "ackPendingCount": 0,
                "totalMessages": 0,
                "bufferLength": 10000,
                "bufferUsageLimit": 0.8,
                "bufferUsage": 0,
                "isFull": false,
                "conditions": null,
                "label": "0"
            },
            "animated": true,
            "type": "smoothstep"
        }, {
            "id": "preproc-infer",
            "label": "0",
            "source": "preproc",
            "target": "infer",
            "data": {
                "pipeline": "simple-pipeline",
                "fromVertex": "preproc",
                "toVertex": "infer",
                "bufferName": "dataflow-system-simple-pipeline-postproc-publisher",
                "pendingCount": 0,
                "ackPendingCount": 0,
                "totalMessages": 0,
                "bufferLength": 10000,
                "bufferUsageLimit": 0.8,
                "bufferUsage": 0,
                "isFull": false,
                "conditions": null,
                "label": "0"
            },
            "animated": true,
            "type": "smoothstep"
        }, {
            "id": "infer-train",
            "label": "0",
            "source": "infer",
            "target": "train",
            "data": {
                "pipeline": "simple-pipeline",
                "fromVertex": "infer",
                "toVertex": "train",
                "bufferName": "dataflow-system-simple-pipeline-postproc-publisher",
                "pendingCount": 0,
                "ackPendingCount": 0,
                "totalMessages": 18,
                "bufferLength": 10000,
                "bufferUsageLimit": 0.8,
                "bufferUsage": 0,
                "isFull": false,
                "conditions": {"keyIn": ["train"]},
                "label": "0"
            },
            "animated": true,
            "type": "smoothstep"
        }, {
            "id": "train-train-1",
            "label": "49",
            "source": "train",
            "target": "train-1",
            "data": {
                "pipeline": "simple-pipeline",
                "fromVertex": "train",
                "toVertex": "train-1",
                "bufferName": "dataflow-system-simple-pipeline-postproc-publisher",
                "pendingCount": 19,
                "ackPendingCount": 30,
                "totalMessages": 49,
                "bufferLength": 10000,
                "bufferUsageLimit": 0.8,
                "bufferUsage": 0.0049,
                "isFull": false,
                "conditions": null,
                "label": "49"
            },
            "animated": true,
            "type": "smoothstep"
        }, {
            "id": "train-1-train-output",
            "label": "0",
            "source": "train-1",
            "target": "train-output",
            "data": {
                "pipeline": "simple-pipeline",
                "fromVertex": "train-1",
                "toVertex": "train-output",
                "bufferName": "dataflow-system-simple-pipeline-postproc-publisher",
                "pendingCount": 0,
                "ackPendingCount": 0,
                "totalMessages": 30,
                "bufferLength": 10000,
                "bufferUsageLimit": 0.8,
                "bufferUsage": 0,
                "isFull": false,
                "conditions": null,
                "label": "0"
            },
            "animated": true,
            "type": "smoothstep"
        }, {
            "id": "infer-postproc",
            "label": "53",
            "source": "infer",
            "target": "postproc",
            "data": {
                "pipeline": "simple-pipeline",
                "fromVertex": "infer",
                "toVertex": "postproc",
                "bufferName": "dataflow-system-simple-pipeline-postproc-publisher",
                "pendingCount": 0,
                "ackPendingCount": 53,
                "totalMessages": 53,
                "bufferLength": 10000,
                "bufferUsageLimit": 0.8,
                "bufferUsage": 0.0053,
                "isFull": false,
                "conditions": {"keyIn": ["postproc"]},
                "label": "53"
            },
            "animated": true,
            "type": "smoothstep"
        }, {
            "id": "postproc-log-output",
            "label": "0",
            "source": "postproc",
            "target": "log-output",
            "data": {
                "pipeline": "simple-pipeline",
                "fromVertex": "postproc",
                "toVertex": "log-output",
                "bufferName": "dataflow-system-simple-pipeline-postproc-publisher",
                "pendingCount": 0,
                "ackPendingCount": 0,
                "totalMessages": 0,
                "bufferLength": 10000,
                "bufferUsageLimit": 0.8,
                "bufferUsage": 0,
                "isFull": false,
                "conditions": null,
                "label": "0"
            },
            "animated": true,
            "type": "smoothstep"
        }, {
            "id": "postproc-publisher",
            "label": "0",
            "source": "postproc",
            "target": "publisher",
            "data": {
                "pipeline": "simple-pipeline",
                "fromVertex": "postproc",
                "toVertex": "publisher",
                "bufferName": "dataflow-system-simple-pipeline-postproc-publisher",
                "pendingCount": 0,
                "ackPendingCount": 0,
                "totalMessages": 49,
                "bufferLength": 10000,
                "bufferUsageLimit": 0.8,
                "bufferUsage": 0,
                "isFull": false,
                "conditions": null,
                "label": "0"
            },
            "animated": true,
            "type": "smoothstep"
        }],
        "status": {
            "conditions": [{
                "type": "Configured",
                "status": "True",
                "lastTransitionTime": "2022-05-19T21:06:02Z",
                "reason": "Successful",
                "message": "Successful"
            }, {
                "type": "Deployed",
                "status": "True",
                "lastTransitionTime": "2022-05-19T21:06:02Z",
                "reason": "Successful",
                "message": "Successful"
            }],
            "phase": "Running",
            "lastUpdated": "2022-05-19T21:06:02Z"

        }
    }

    it("Load Graph screen", async () => {
        render(<Graph data={data} pipelineId={'simple-pipeline'} namespaceId={'dataflow-system'}/>)
        await waitFor(() => expect(screen.getByTestId("graph")).toBeInTheDocument());
        await waitFor(() => expect(screen.getByTestId("graph")).toBeVisible());
        await waitFor(() => expect(screen.getByTestId("card")).toBeVisible());

    })

})
