import {
  DataProvider,
  GetListParams,
  RaRecord,
  GetListResult,
  QueryFunctionContext,
  Identifier,
  GetOneParams,
  GetOneResult,
  CreateParams,
  CreateResult,
  UpdateParams,
  UpdateResult,
  DeleteParams,
  DeleteResult,
  DeleteManyParams,
  DeleteManyResult,
  GetManyParams,
  GetManyReferenceParams,
  GetManyReferenceResult,
  GetManyResult,
  UpdateManyParams,
  UpdateManyResult,
} from 'react-admin';

// Define the type for creation input (without id)
interface PostInput {
  title: string;
  views: string;
}

// Define the full Post type which extends RaRecord (including id)
interface Post extends RaRecord, PostInput {
  id: string;  // Explicitly defining id as part of the Post type
}

const dataProvider: DataProvider = {
  getList: async <RecordType extends RaRecord = Post>(
    resource: string,
    params: GetListParams & QueryFunctionContext
  ): Promise<GetListResult<RecordType>> => {
    const { pagination } = params;
    const page = pagination ? pagination.page : 1;
    const perPage = pagination ? pagination.perPage : 3;

    const response = await fetch(`http://localhost:3001/posts?page=${page}&perPage=${perPage}`);
    const { data, total }: { data: Post[]; total: number } = await response.json();

    return {
      data: data as unknown as RecordType[],
      total,
    };
  },

  getOne: async <RecordType extends RaRecord = Post>(
    resource: string,
    params: GetOneParams<RecordType> & QueryFunctionContext
  ): Promise<GetOneResult<RecordType>> => {
    const response = await fetch(`http://localhost:3001/posts/${params.id}`);
    const { data }: { data: Post } = await response.json();
    return { data: data as unknown as RecordType };
  },

  // For create, we use two generics:
  //  - RecordType for the input type (defaults to PostInput)
  //  - ResultRecordType for the returned type (defaults to Post)
  create: async <
    RecordType extends Omit<RaRecord, "id"> = PostInput,
    ResultRecordType extends RaRecord = Post
  >(
    resource: string,
    params: CreateParams<RecordType>
  ): Promise<CreateResult<ResultRecordType>> => {
    const response = await fetch(`http://localhost:3001/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params.data),
    });
    const { data }: { data: Post } = await response.json();
    return { data: data as unknown as ResultRecordType };
  },

  update: async <RecordType extends RaRecord = Post>(
    resource: string,
    params: UpdateParams<RecordType>
  ): Promise<UpdateResult<RecordType>> => {
    const response = await fetch(`http://localhost:3001/posts/${params.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params.data),
    });
    const { data }: { data: Post } = await response.json();
    return { data: data as unknown as RecordType };
  },

  delete: async <RecordType extends RaRecord = Post>(
    resource: string,
    params: DeleteParams
  ): Promise<DeleteResult<RecordType>> => {
    await fetch(`http://localhost:3001/posts/${params.id}`, {
      method: 'DELETE',
    });
    return { data: {} as RecordType };
  },

  getMany: function <RecordType extends RaRecord = any>(resource: string, params: GetManyParams<RecordType> & QueryFunctionContext): Promise<GetManyResult<RecordType>> {
    throw new Error('Function not implemented.');
  },

  getManyReference: function <RecordType extends RaRecord = any>(resource: string, params: GetManyReferenceParams & QueryFunctionContext): Promise<GetManyReferenceResult<RecordType>> {
    throw new Error('Function not implemented.');
  },

  updateMany: function <RecordType extends RaRecord = any>(resource: string, params: UpdateManyParams): Promise<UpdateManyResult<RecordType>> {
    throw new Error('Function not implemented.');
  },

  deleteMany: function <RecordType extends RaRecord = any>(resource: string, params: DeleteManyParams<RecordType>): Promise<DeleteManyResult<RecordType>> {
    throw new Error('Function not implemented.');
  }
};

export default dataProvider;
