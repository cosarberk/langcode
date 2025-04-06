import { RunnableSequence } from "@langchain/core/runnables";
import { CreateSqlQueryChainFields } from "langchain/chains/sql_db";
import { createSqlQueryChain } from "langchain/chains/sql_db";
import {SqlDatabase} from "langchain/sql_db"
import { DataSource, DataSourceOptions } from "typeorm";

export const database ={
  createDataSource:async (options:DataSourceOptions):Promise<DataSource> =>{ return new DataSource(options);},
  createSqlChain:async ({ llm, db, prompt, k, dialect }: CreateSqlQueryChainFields):Promise<RunnableSequence<Record<string, unknown>, string>>=>{return await createSqlQueryChain({llm, db, dialect, k,prompt});},
  db:SqlDatabase

}
