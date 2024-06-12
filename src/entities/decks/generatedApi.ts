/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Study {
  difficulty: number;
}

export interface Statistics {
  cards_amount: number;
  cards_average_difficulty: number;
  cards_today: number;
  cards_tomorrow: number;
}

export interface Deck {
  id: number;
  name: string;
  description?: string;
  created_at: string;
  updated_at: string;
  last_study?: string;
  statistics?: Statistics;
}

export type CardCreateParameters = CardConfigurableParameters & {
  difficulty: number;
};

export interface DeckConfigurableParameters {
  name: string;
  description?: string;
}

export interface Card {
  id: number;
  question: string;
  answer: string;
  created_at: string;
  updated_at: string;
  deck_id: number;
  difficulty: number;
  next_study: string;
}

export interface CardConfigurableParameters {
  question: string;
  answer: string;
}

import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  HeadersDefaults,
  ResponseType,
} from 'axios';
import axios from 'axios';

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, 'data' | 'params' | 'url' | 'responseType'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, 'body' | 'method' | 'query' | 'path'>;

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, 'data' | 'cancelToken'> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain',
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || '/api/private',
    });

    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig,
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === 'object' && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === 'object') {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== 'string') {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { 'Content-Type': type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Cards REST API
 * @version 0.1.0
 * @baseUrl /api/private
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  constructor() {
    super();
    this.instance.interceptors.response.use(
      function (response) {
        return response;
      },
      function (error) {
        if (error.response.status === 401) {
          window.location.replace('/auth');
        }
        return error;
      },
    );
  }

  /**
   * @description Returns all decks available for current user
   *
   * @name GetDecks
   * @request GET:/decks
   */
  getDecks = (params: RequestParams = {}) =>
    this.request<Deck[], any>({
      path: `/decks`,
      method: 'GET',
      format: 'json',
      ...params,
    });

  /**
   * @description Creates deck with provided unique name
   *
   * @name CreateDeck
   * @request POST:/decks
   */
  createDeck = (data: DeckConfigurableParameters, params: RequestParams = {}) =>
    this.request<Deck, any>({
      path: `/decks`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });

  /**
   * @description Return all study cards
   *
   * @name GetStudy
   * @request GET:/decks/{deck_id}/study
   */
  getStudy = (deckId: number, params: RequestParams = {}) =>
    this.request<Card[], any>({
      path: `/decks/${deckId}/study`,
      method: 'GET',
      format: 'json',
      ...params,
    });

  /**
   * @description Return deck by id
   *
   * @name GetDeck
   * @request GET:/decks/{deck_id}
   */
  getDeck = (deckId: number, params: RequestParams = {}) =>
    this.request<Deck, any>({
      path: `/decks/${deckId}`,
      method: 'GET',
      format: 'json',
      ...params,
    });

  /**
   * @description Update deck by id with parameters
   *
   * @name UpdateDeck
   * @request PUT:/decks/{deck_id}
   */
  updateDeck = (deckId: number, data: DeckConfigurableParameters, params: RequestParams = {}) =>
    this.request<Deck, any>({
      path: `/decks/${deckId}`,
      method: 'PUT',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });

  /**
   * @description Delete deck by id
   *
   * @name DeleteDeck
   * @request DELETE:/decks/{deck_id}
   */
  deleteDeck = (deckId: number, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/decks/${deckId}`,
      method: 'DELETE',
      ...params,
    });

  /**
   * @description Get all cards in deck
   *
   * @name GetCards
   * @request GET:/decks/{deck_id}/cards
   */
  getCards = (deckId: number, params: RequestParams = {}) =>
    this.request<Card[], any>({
      path: `/decks/${deckId}/cards`,
      method: 'GET',
      format: 'json',
      ...params,
    });

  /**
   * @description Create new card in deck
   *
   * @name CreateCard
   * @request POST:/decks/{deck_id}/cards
   */
  createCard = (deckId: number, data: CardCreateParameters, params: RequestParams = {}) =>
    this.request<Card, any>({
      path: `/decks/${deckId}/cards`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });

  /**
   * @description Delete card by id
   *
   * @name DeleteCard
   * @request DELETE:/decks/{deck_id}/cards/{card_id}
   */
  deleteCard = (deckId: number, cardId: number, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/decks/${deckId}/cards/${cardId}`,
      method: 'DELETE',
      ...params,
    });

  /**
   * @description Update card by id with parameters
   *
   * @name UpdateCard
   * @request PUT:/decks/{deck_id}/cards/{card_id}
   */
  updateCard = (
    deckId: number,
    cardId: number,
    data: CardConfigurableParameters,
    params: RequestParams = {},
  ) =>
    this.request<Card, any>({
      path: `/decks/${deckId}/cards/${cardId}`,
      method: 'PUT',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });

  /**
   * @description Study card
   *
   * @name StudyCard
   * @request POST:/decks/{deck_id}/cards/{card_id}/study
   */
  studyCard = (deckId: number, cardId: number, data: Study, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/decks/${deckId}/cards/${cardId}/study`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
}
