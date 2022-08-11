export type ReportType =
  | 'abusive_violent'
  | 'unauthorize_copyright'
  | 'child_exploitation'
  | 'pornography'
  | 'private_information'
  | 'spam'
  | 'unauthorize_trademark';
export interface UserDetailInterface {
  createdAt: string;
  id: string;
  profilePictureURL: string;
  username: string;
  name: string;
}
export interface ReportDetailInterface {
  platform: string;
  text: string;
  user: UserDetailInterface;
}

export interface ReportersInterface {
  createdAt: string;
  description: string;
  id: string;
  referenceType: string;
  reportId: string;
  reportedBy: string;
  updatedAt: string;
}
export interface DataResponseUserReportedInterface {
  createdAt: string;
  id: string;
  referenceId: string;
  referenceType: string;
  reportedDetail: ReportDetailInterface;
  reporters: Array<ReportersInterface>;
  status: string;
  totalReported: number;
  type: string;
  updatedAt: string;
}

export interface MetaResponseUserReportedInterface {
  currentPage: number;
  itemsPerPage: number;
  nextPage: number;
  totalItemCount: number;
  totalPageCount: number;
}
export interface ResponseUserReported {
  data: DataResponseUserReportedInterface;
  meta: MetaResponseUserReportedInterface;
}

export const ReportTypeCategoryMapper: Record<ReportType, string> = {
  abusive_violent: 'Abusive behavior and violent threats',
  unauthorize_copyright: 'Unauthorized use of copyrighted materials',
  child_exploitation: 'Child sexual exploitation',
  pornography: 'Pornography (No NSFW Tag)',
  private_information: 'Private information posted on Myriad',
  spam: 'Spam and system abuse',
  unauthorize_trademark: 'Unauthorized trademark',
};
