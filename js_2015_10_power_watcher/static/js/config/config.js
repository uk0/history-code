//数据库服务器路径
var serverPath = 'http://'+window.location.host+'/payServer/pay/v1/';
//web路径
var webPath = 'http://'+window.location.host+'/';
//获取系统功能URL
var getSystemFeatureURL = serverPath + "sys/sys_config";
/**
 * 组织机构URL列表
 */
var organizationInfoURLs = {
	/**
	 * 根据组织机构ID获取A2数据库组织机构信息（根据从属级关系排序）
	 * 包含 org_id 组织机构ID
	 */
	organizationByOrgIDURL : serverPath + 'organization/organizationByOrgID',
	/**
	 * 根据父组织机构ID获取本地数据库组织机构信息（根据从属级关系排序）
	 * 包含 parent_id 组织机构父ID
	 */
	organizationInFecsByParentIDURL : serverPath + 'organization/organizationInFecsByParentID',
	/**
	 * 根据组织机构ID获取A2数据库对应站库信息
	 * org_id 组织机构ID
	 */
	stationByOrgIDURL : serverPath + 'organization/stationByOrgID',
	/**
	 * 根据组织机构ID和站库类型（可选）获取A2数据库对应站库信息
	 * 包含 org_id 组织机构ID以及站库类型的数据传输对象 注意站库类型key 
	 * station_type1,station_type2,station_type3...(最多支持station_type8)
	 */
	stationByOrgIDAndStationTypeURL : serverPath + 'organization/stationByOrgIDAndStationType',
	/**
	 * 根据站库ID和设备类型获取A2数据库对应设备信息
	 * 包含 station_id 站库ID以及设备类型的数据传输对象 注意设备类型key 
	 * device_type1,device_type2,device_type3...(最多支持device_type8)
	 */
	deviceByStationIDAndDeviceTypeURL : serverPath + 'organization/deviceByStationIDAndDeviceType',
	/**
	 * 获取A2数据库对应所有站库类型信息
	 */
	allStationTypeURL : serverPath + 'organization/allStationType',
	/**
	 * 获取A2数据库对应所有设备类型信息
	 */
	allDeviceTypeURL : serverPath + 'organization/allDeviceType',
	/**
	 * 根据井所属组织机构ID以及产油类型（可选）获取A2数据库对应所有井信息
	 * 包含组织机构 org_id 组织机构ID以及油品类型的数据传输对象 注意油品类型key 
	 * oil_products_sorting1,oil_products_sorting2,oil_products_sorting3（不定长）
	 */
	allWellByOrgIDAndOilProductsSortingURL : serverPath + 'organization/allWellByOrgIDAndOilProductsSorting',
	/**
	 * 根据井所属组织机构ID以及产油类型（可选）获取A2数据库对应生产井信息
	 * 包含组织机构 org_id 组织机构ID以及油品类型的数据传输对象 注意油品类型key 
	 * oil_products_sorting1,oil_products_sorting2,oil_products_sorting3（不定长）
	 */
	devWellByOrgIDAndOilProductsSortingURL : serverPath + 'organization/devWellByOrgIDAndOilProductsSorting',
	/**
	 * 获取所有产油类型信息
	 */
	productClassInfoURL : serverPath + 'organization/allProductClassInfo'
}
