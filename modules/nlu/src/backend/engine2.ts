export default class Engine2 {}

export interface StructuredTrainInput {
  botId: string
  languageCode: string
  pattern_entities: PatternEntity[]
  list_entities: ListEntity[]
  contexts: string[]
  intents: StructuredIntent[]
}

export interface ProcessedTrainInput {} // TODO:
export interface StructuredTrainOutput {}

export interface PatternEntity {
  name: string
  pattern: string
  examples: string[]
  ignoreCase: boolean
  sensitive: boolean
}

export interface ListEntity {
  name: string
  synonyms: { [canonical: string]: string[] }
  fuzzyMatching: boolean
  sensitive: boolean
}

export interface StructuredIntent {
  name: string
  contexts: string[]
  utterances: Utterance[]
}

export interface Utterance {
  toString(options: UtteranceToStringOptions): string
  entities: UtteranceEntity[]
  slots: UtteranceSlot[]
  tokens: UtteranceToken[]
}
export type UtteranceToStringOptions = {
  lowerCase: boolean
  onlyWords: boolean
  slots: 'keep-value' | 'keep-slot-name' | 'keep-entity-name'
}
export type UtteranceRange = { startTokenIdx: number; endTokenIdx: number }
export type ExtractedEntity = { confidence: number; type: string }
export type ExtractedSlot = { confidence: number; name: string }
export type UtteranceEntity = UtteranceRange & ExtractedEntity
export type UtteranceSlot = UtteranceRange & ExtractedSlot
export interface UtteranceToken {
  index: number
  original: string
  isWord: boolean
  startsWithSpace: boolean
  isBOS: boolean
  isEOS: boolean
  vectors: number[]
  tfidf: number
  offset: number
  entities: ExtractedEntity[]
  slot: string
}
// STRUCTURE PIPELINE --> CompleteStructure
// - prepare entities$
// - prepare contexts$
// - prepare intents$
// - prepare none$
// - prepare utterances*
//   - tokenize*
//   - extract entities*
//   - vectorize*
// - tfidf$
// - tag slots$
export interface Trainer {
  (input: StructuredTrainInput, tools: TrainTools, cancelToken: CancellationToken): TrainResult
}
export interface TrainTools {}
export interface TrainResult {}

export interface Predictor {
  languageCode: string
  predict(text: string): Promise<void>
}

// SENTENCE PROCESSING PIPELINE --> PredictionUtterance

// TRAIN PIPELINE
// - context ranking
// - intent classifiers
//   - svm classifier
//   - exact matcher
// - slot tagger

// CompleteStructure --> PREDICT PIPELINE
// lang_identification
// prepare_utterance pipeline
// rank contexts
// predict intents
// extract slots
// ambiguity detection

export interface CancellationToken {
  uid: string
  isCancelled: boolean
  cancelledAt: Date
  cancel(): Promise<void>
}

export interface TrainPipelineTools {}

export interface Model {
  languageCode: string
  inputData: StructuredTrainInput
  outputData: StructuredTrainOutput
  startedAt: Date
  finishedAt: Date
  artefacts: any[] // TODO:
}
