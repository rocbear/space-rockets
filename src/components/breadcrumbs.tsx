import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Box,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ChevronsRight } from "react-feather";

type BreadcrumbItemType = {
  label: string;
  to?: string;
};

export default function Breadcrumbs({
  items,
}: {
  items: BreadcrumbItemType[];
}) {
  return (
    <Breadcrumb
      m="6"
      spacing="1"
      separator={<Box size="1em" as={ChevronsRight} color="gray.300" />}
    >
      {items.map((item, index) => {
        const isCurrentPage = items.length === index + 1;
        return (
          <BreadcrumbItem isCurrentPage={isCurrentPage} key={item.label}>
            {item.to ? (
              <BreadcrumbLink
                as={!isCurrentPage ? Link : undefined}
                to={item.to}
              >
                {item.label}
              </BreadcrumbLink>
            ) : (
              item.label
            )}
          </BreadcrumbItem>
        );
      })}
    </Breadcrumb>
  );
}
