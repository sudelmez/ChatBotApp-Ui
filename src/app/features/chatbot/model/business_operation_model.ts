export interface BusinessOperationModel {
  businessTypeId: number | null;
  userId: string;
  transactionId: string |null;
  uploadData: {
      dateInfo: DateInfoModel | null;
      inputText: InputTextModel | null;
  };
}

export interface UploadDocModel {
  docFileLink: string | null;
  docFilePath: string | null;
  fileExtension: string | null;
  docFileName: string | null;
}

export interface InputTextModel {
  answerInput: string | null;
}

export interface DateInfoModel {
  caseDate: Date | null;
}
