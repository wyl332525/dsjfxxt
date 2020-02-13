package com.kmzc.entity.wechat.resp;

public class Video {
	private String MediaId;  //ͨ���زĹ����еĽӿ��ϴ���ý���ļ����õ���id
	private String Title;		//��Ƶ��Ϣ�ı���
	private String Description; //��Ƶ��Ϣ������
	public String getMediaId() {
		return MediaId;
	}
	public void setMediaId(String mediaId) {
		MediaId = mediaId;
	}
	public String getTitle() {
		return Title;
	}
	public void setTitle(String title) {
		Title = title;
	}
	public String getDescription() {
		return Description;
	}
	public void setDescription(String description) {
		Description = description;
	}
}
